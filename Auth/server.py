from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError  # Added `JWTError`
from fastapi.middleware.cors import CORSMiddleware

# 🔹 Secret key for JWT
SECRET_KEY = "my_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ✅ Initialize FastAPI
app = FastAPI()

# 🔹 Simulating a database (Use MongoDB/PostgreSQL later)
fake_db = {}

# 🔹 Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🔹 OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ✅ **User Registration Model**
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

# ✅ **User Database Model (Stored Data)**
class UserInDB(UserRegister):
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
async def register(user: UserRegister):
    if user.email in fake_db:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    hashed_password = hash_password(user.password)
    fake_db[user.email] = UserInDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    
    return {"message": "User registered successfully"}

# ✅ **User Login (returns JWT Token)**
@app.post("/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
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
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ✅ **Enable CORS (Fixing Syntax Issue)**
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Fixed comma issue
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # ✅ Allow all headers
)

