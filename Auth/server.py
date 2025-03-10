from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    username: str
    email: str
    password: str
    role: str

@app.post("/register")  # ✅ Make sure this exists
async def register(user: User):
    if user.email == "existing@example.com":
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User registered successfully", "user": user}
