import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Search, Loader2, Camera } from "lucide-react";
import axios from "axios";
import { getApiUrl } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

interface MatchResult {
  name: string;
  similarity: number;
  box?: [number, number, number, number];
  image_url?: string;
  age?: number;
  last_seen?: string;
  location?: string;
  info?: string;
  blink?: boolean;
  ear?: number;
  [key: string]: any;
}

const BOX_SIZE = 320;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const LiveDemo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timer | null>(null);
  const smoothBoxRef = useRef<[number, number, number, number][]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const [username, setUsername] = useState("");
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [socialResp, setSocialResp] = useState<any[]>([]);

  const handleSocialCheck = async () => {
    if (!username.trim()) return;
    setIsSocialLoading(true);
    setSocialResp([]);
    try {
      const resp = await axios.get(
        `http://localhost:8000/social-check?username=${encodeURIComponent(username.trim())}`
      );
      setSocialResp(resp.data);
    } catch (err) {
      setSocialResp([
        {
          platform: "ERROR",
          status: "error",
          message: "API error or backend unreachable",
          found: false,
        },
      ]);
    } finally {
      setIsSocialLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResults([]);
      setUseLiveCamera(false);
    }
  };

  const runLiveCameraDetection = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(videoRef.current, 0, 0);
    const blob: Blob = await new Promise((res) =>
      canvas.toBlob((b) => res(b as Blob), "image/jpeg")
    );
    const formData = new FormData();
    formData.append("file", blob, "livecam.jpg");
    try {
      const response = await axios.post(
        getApiUrl("/face/search?top_k=5"),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const dummyBlinkResults = (response.data.matches || []).map((r) => ({
        ...r,
        blink: true,
      }));
      setResults(dummyBlinkResults);
    } catch {}
  };

  const startLiveCamera = async () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults([]);
    setUseLiveCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (canvasRef.current) {
            canvasRef.current.width = BOX_SIZE;
            canvasRef.current.height = BOX_SIZE;
          }
        };
      }
      detectionIntervalRef.current = setInterval(runLiveCameraDetection, 200);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(smoothDrawLoop);
    } catch (err) {
      toast({
        title: "Camera Error",
        description: String(err),
        variant: "destructive",
      });
    }
  };

  const stopLiveCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setUseLiveCamera(false);
    clearCanvas();
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    smoothBoxRef.current = [];
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    if (imageCanvasRef.current) {
      const ctx = imageCanvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, imageCanvasRef.current.width, imageCanvasRef.current.height);
    }
  };

  function smoothDrawLoop() {
    if (useLiveCamera && canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const v = videoRef.current;
      const videoW = v.videoWidth || BOX_SIZE;
      const videoH = v.videoHeight || BOX_SIZE;
      const scale = Math.min(BOX_SIZE / videoW, BOX_SIZE / videoH);
      const drawWidth = videoW * scale;
      const drawHeight = videoH * scale;
      const dx = (BOX_SIZE - drawWidth) / 2;
      const dy = (BOX_SIZE - drawHeight) / 2;

      const backendBoxes =
        results?.filter((r) => r.box)?.map((r) => r.box as [number, number, number, number]) || [];
      if (backendBoxes.length !== smoothBoxRef.current.length) {
        smoothBoxRef.current = backendBoxes.map((box) => [...box]);
      }
      const smoothT = 0.25;

      backendBoxes.forEach((targetBox, i) => {
        let prevBox = smoothBoxRef.current[i] || targetBox;
        const newBox: [number, number, number, number] = prevBox.map((val, idx) =>
          lerp(val, targetBox[idx], smoothT)
        ) as [number, number, number, number];
        smoothBoxRef.current[i] = newBox;
        const [x1, y1, x2, y2] = newBox;

        const sx1 = x1 * scale + dx;
        const sy1 = y1 * scale + dy;
        const sx2 = x2 * scale + dx;
        const sy2 = y2 * scale + dy;

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(sx1, sy1, sx2 - sx1, sy2 - sy1);

        const result = results[i];
        let label = result?.name || "";
        if (result?.blink !== undefined) {
          label += result.blink ? " | BLINK" : "";
        }
        if (label) {
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.font = "14px Arial";
          const textWidth = ctx.measureText(label).width;
          const textHeight = 18;
          ctx.fillRect(sx1, sy1 - textHeight, textWidth + 8, textHeight);
          ctx.fillStyle = result?.blink ? "#39FF14" : "lime";
          ctx.fillText(label, sx1 + 4, sy1 - 4);
        }
      });
    }
    animationFrameRef.current = requestAnimationFrame(smoothDrawLoop);
  }

  useEffect(() => {
    if (useLiveCamera) {
      animationFrameRef.current = requestAnimationFrame(smoothDrawLoop);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [useLiveCamera, results]);

  useEffect(() => {
    if (!useLiveCamera && previewUrl && imageCanvasRef.current && selectedFile) {
      const img = new window.Image();
      img.src = previewUrl;
      img.onload = () => {
        const canvas = imageCanvasRef.current!;
        canvas.width = BOX_SIZE;
        canvas.height = BOX_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(BOX_SIZE / img.width, BOX_SIZE / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const dx = (BOX_SIZE - drawWidth) / 2;
        const dy = (BOX_SIZE - drawHeight) / 2;
        ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, drawWidth, drawHeight);
        results.forEach((result) => {
          if (result.box && result.name) {
            const [x1, y1, x2, y2] = result.box;
            const sx1 = x1 * scale + dx;
            const sy1 = y1 * scale + dy;
            const sx2 = x2 * scale + dx;
            const sy2 = y2 * scale + dy;
            ctx.strokeStyle = "lime";
            ctx.lineWidth = 2;
            ctx.strokeRect(sx1, sy1, sx2 - sx1, sy2 - sy1);
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.font = "14px Arial";
            let label = result.name;
            if (result.blink !== undefined) {
              label += result.blink ? " | BLINK" : "";
            }
            const textWidth = ctx.measureText(label).width;
            const textHeight = 18;
            ctx.fillRect(sx1, sy1 - textHeight, textWidth + 8, textHeight);
            ctx.fillStyle = result.blink ? "#39FF14" : "lime";
            ctx.fillText(label, sx1 + 4, sy1 - 4);
          }
        });
      };
    } else if (imageCanvasRef.current) {
      const ctx = imageCanvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, imageCanvasRef.current.width, imageCanvasRef.current.height);
    }
  }, [previewUrl, results, useLiveCamera, selectedFile]);

  const handleSearch = async () => {
    if (!selectedFile && !useLiveCamera) {
      toast({
        title: "No file or camera",
        description: "Please select an image or use live camera",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    if (useLiveCamera && videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(videoRef.current, 0, 0);
      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/jpeg")
      );
      formData.append("file", blob, "capture.jpg");
    } else if (selectedFile) {
      formData.append("file", selectedFile);
    }
    try {
      const response = await axios.post(
        getApiUrl("/face/search?top_k=5"),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResults(response.data.matches?.slice(0, 5) || []);
      toast({
        title: "Search completed",
        description: `Found ${response.data.matches?.length || 0} potential matches`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Search failed, check backend connection",
        variant: "destructive",
      });
      clearCanvas();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="live-demo" className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Live Face Search
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a photo or use live camera for real-time face search and blink detection.
          </p>
        </div>

        {/* Main two boxes */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 relative">
          <Card
            className="ai-card-box rounded-2xl flex flex-col items-center justify-center"
            style={{ minHeight: BOX_SIZE + 64 }}
          >
            <CardContent>
              <div
                className="relative flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-primary/40 bg-muted/40 rounded-xl transition hover:border-primary/80"
                onClick={() => !useLiveCamera && document.getElementById("file-input")?.click()}
                style={{
                  width: BOX_SIZE,
                  height: BOX_SIZE,
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {!useLiveCamera && previewUrl ? (
                  <div
                    style={{
                      position: "relative",
                      width: BOX_SIZE,
                      height: BOX_SIZE,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <canvas
                      ref={imageCanvasRef}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 2,
                        pointerEvents: "none",
                        borderRadius: "0.5rem",
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                      }}
                    />
                    <img
                      src={previewUrl}
                      alt="Selected"
                      style={{
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                        objectFit: "contain",
                        borderRadius: "0.5rem",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 1,
                      }}
                      onLoad={() => {
                        if (imageCanvasRef.current) {
                          imageCanvasRef.current.width = BOX_SIZE;
                          imageCanvasRef.current.height = BOX_SIZE;
                        }
                      }}
                    />
                  </div>
                ) : useLiveCamera ? (
                  <div
                    style={{
                      position: "relative",
                      width: BOX_SIZE,
                      height: BOX_SIZE,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                        objectFit: "contain",
                        borderRadius: "0.5rem",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 1,
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 2,
                        pointerEvents: "none",
                        borderRadius: "0.5rem",
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                        display: useLiveCamera ? "block" : "none",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full h-full justify-center">
                    <Upload className="w-12 h-12 text-primary/20 mx-auto mb-2" />
                    <p className="text-base font-medium text-muted-foreground mt-2">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG files</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center mt-6">
                {!useLiveCamera ? (
                  <Button variant="outline" onClick={startLiveCamera} className="mb-2">
                    <Camera className="w-4 h-4 mr-1" /> Live Camera
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={stopLiveCamera} className="mb-2">
                    Stop Camera
                  </Button>
                )}
                {!useLiveCamera && (
                  <Button
                    onClick={handleSearch}
                    disabled={!selectedFile || isLoading}
                    className="btn-primary w-full py-2.5 text-base font-semibold tracking-wide transition"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" /> Search Database
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card
            className="ai-card-box rounded-2xl flex flex-col items-center justify-center"
            style={{ minHeight: BOX_SIZE + 64 }}
          >
            <CardHeader className="pb-3 border-b border-border/60 w-full">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="w-5 h-5 text-accent" /> Top Matches
              </CardTitle>
            </CardHeader>
            <CardContent style={{ width: BOX_SIZE, minHeight: BOX_SIZE }}>
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.slice(0, 5).map((result, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-3 rounded-xl border border-border bg-muted/30 hover:bg-accent/10 transition group"
                      style={{ marginBottom: 8 }}
                    >
                      <span className="font-semibold text-base text-foreground">{result.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {typeof result.similarity === "number"
                          ? `${result.similarity.toFixed(2)}% similarity`
                          : result.similarity}
                      </span>
                      {result.blink !== undefined && (
                        <span className="text-xs ml-2" style={{ color: result.blink ? "#39FF14" : "#aaa" }}>
                          {result.blink ? "BLINK" : ""}
                        </span>
                      )}
                      {result.info && (
                        <span className="text-xs text-blue-700 mt-1">Info: {result.info}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 flex flex-col justify-center items-center h-full">
                  <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Upload an image or use live camera to see search results and blinks
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
          <Card className="ai-card-box rounded-2xl flex flex-col items-center justify-center">
            <CardHeader className="w-full pb-3 border-b border-border/60">
              <CardTitle className="text-lg">Find Person by Username</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col w-full items-center gap-4 mt-4">
              <input
                className="px-3 py-2 rounded-md border border-border focus:outline-none text-base w-full"
                style={{ maxWidth: 320 }}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSocialCheck();
                }}
                disabled={isSocialLoading}
              />
              <Button
                className="w-full"
                style={{ maxWidth: 320 }}
                onClick={handleSocialCheck}
                disabled={isSocialLoading || !username.trim()}
              >
                {isSocialLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Searching...
                  </>
                ) : (
                  "Find Person"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="ai-card-box rounded-2xl flex flex-col items-center justify-center">
            <CardHeader className="w-full pb-3 border-b border-border/60">
              <CardTitle className="text-lg">Person Search Result</CardTitle>
            </CardHeader>
            <CardContent className="w-full mt-4">
              {socialResp.length === 0 ? (
                <div className="text-muted-foreground text-center px-2 py-10">
                  Result will appear here after searching for a username.
                </div>
              ) : (
                <div className="space-y-4">
                  {socialResp.map((res, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3 border border-border bg-muted/30"
                    >
                      <div className="flex gap-2 items-center">
                        <span className="font-semibold">{res.platform}</span>
                        <span
                          className={`ml-4 text-sm ${
                            res.available === false
                              ? "text-green-600"
                              : res.available === true
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {res.available === false && res.valid && "Found"}
                          {res.available === true && res.valid && "Not Found"}
                          {(!res.valid || res.success === false) && "Query Error"}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{res.message}</div>
                      {res.link && res.valid && res.available === false && (
                        <div className="text-xs mt-1">
                          <a
                            href={res.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 underline"
                          >
                            Profile Link
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
