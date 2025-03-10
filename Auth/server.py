from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt 
from fastapi.middleware.cors import CORSMiddleware

# 🔹 Secret key for JWT
SECRET_KEY = "my_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app = FastAPI()

# 🔹 Simulating a database (Use MongoDB/PostgreSQL later)
fake_db = {}

# 🔹 Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

class User(BaseModel):
    username: str
    email: str
    password: str
    role: str

class UserInDB(User):
    hashed_password: str

# 🔹 Utility to hash passwords
def hash_password(password: str):
    return pwd_context.hash(password)

# 🔹 Utility to verify passwords
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 🔹 Generate JWT Token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ✅ **User Registration**
@app.post("/auth/register")
async def register(user: User):
    if user.email in fake_db:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    hashed_password = hash_password(user.password)
    fake_db[user.email] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": user.role
    }
    
    return {"message": "User registered successfully"}

# ✅ **User Login (returns JWT Token)**
@app.post("/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ✅ **Protected Route (Requires JWT)**
@app.get("/auth/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"message": f"Welcome, {payload['sub']}!"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Allow all origins (update in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)