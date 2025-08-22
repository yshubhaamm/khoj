import subprocess
import json

def analyze_social(input_value: str, input_type: str = "username"):
    try:
        result = subprocess.run(
            [
                "npx", "social-analyzer", input_value,
                "--type", input_type,
                "--json"
            ],
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        return {"error": e.stderr}
