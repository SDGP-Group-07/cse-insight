# API Service Documentation

This document outlines the API endpoints, methods, payloads, and responses for the CSE Insight backend. All responses should follow the standard envelope format `{ success: boolean, data: any, message: string }`.

**Base URL:** `http://localhost:5000/api`

---

## Authentication Service

### User Registration
`POST /auth/register`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "role": "investor" // optional, default: "investor"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "investor",
      "createdAt": "ISO8601 Date",
      "updatedAt": "ISO8601 Date"
    },
    "token": "jwt_token_string",
    "refreshToken": "refresh_token_string"
  },
  "message": "User registered successfully"
}
```

**Validation:**
*   Email must be unique.
*   Password minimum 6 characters.
*   Password and confirmPassword must match.
*   Name is required.

### User Login
`POST /auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "investor"
    },
    "token": "jwt_token_string",
    "refreshToken": "refresh_token_string"
  },
  "message": "Login successful"
}
``` 

**Validation:**
*   Email and Password are required.
*   Invalid credentials should return 401 Unauthorized.

### Get Current User (Verify Token)
`GET /auth/me`

**Headers:**
*   `Authorization`: `Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "investor"
    }
  },
  "message": "User retrieved successfully"
}
```

### Logout
`POST /auth/logout`

**Headers:**
*   `Authorization`: `Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Logged out successfully"
}
```

---

## Chatbot Service

### Send Message
`POST /chatbot/message`

**Request Body:**
```json
{
  "message": "string", // User's query
  "userId": "string"   // Optional, for context
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reply": "string", // AI generated response
    "sentiment": "positive" | "neutral" | "negative", // Optional analysis
    "relatedStocks": ["JKH", "COMB"] // Optional suggestions
  },
  "message": "Message processed"
}
```

### Get Chat History
`GET /chatbot/history/:userId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "sender": "user" | "bot",
      "text": "string",
      "timestamp": "ISO8601 Date"
    }
  ],
  "message": "History retrieved"
}
```

---

## Company Service

### Get Company Details
`GET /companies/:symbol`

**Parameters:**
*   `symbol`: Stock symbol (e.g., JKH)

**Response:**
```json
{
  "success": true,
  "data": {
    "symbol": "JKH",
    "name": "John Keells Holdings PLC",
    "sector": "Capital Goods",
    "price": 185.50,
    "change": 2.50,
    "changePercent": 1.35,
    "marketCap": "250B",
    "peRatio": 12.5,
    "eps": 14.80,
    "description": "string",
    "website": "string"
  },
  "message": "Company details retrieved"
}
```

### Get Company Financials
`GET /companies/:symbol/financials`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "period": "Q3 2024",
      "revenue": "45.2B",
      "profit": "4.5B",
      "eps": "3.20"
    }
  ],
  "message": "Financials retrieved"
}
```

### Get Company News
`GET /companies/:symbol/news`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "date": "string", // e.g., "2 hours ago" or ISO date
      "source": "string",
      "url": "string"
    }
  ],
  "message": "News retrieved"
}
```

---

## Market Service

### Get Market Indices
`GET /market/indices`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "ASPI",
      "value": 11245.32,
      "change": 125.45,
      "changePercent": 1.12,
      "status": "up" | "down"
    }
  ],
  "message": "Indices retrieved"
}
```

### Get All Stocks
`GET /market/stocks`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "symbol": "string",
      "name": "string",
      "price": 100.00,
      "change": 1.50,
      "changePercent": 1.5,
      "volume": "string"
    }
  ],
  "message": "Stocks retrieved"
}
```

### Get Top Gainers
`GET /market/top-gainers`

**Response:**
```json
{
  "success": true,
  "data": [
    { "symbol": "LOLC", "price": 380.25, "change": 4.18 }
  ],
  "message": "Top gainers retrieved"
}
```

### Get Top Losers
`GET /market/top-losers`

**Response:**
```json
{
  "success": true,
  "data": [
    { "symbol": "EXPO", "price": 145.75, "change": -2.18 }
  ],
  "message": "Top losers retrieved"
}
```

### Get Sector Performance
`GET /market/sectors`

**Response:**
```json
{
  "success": true,
  "data": [
    { "name": "Banking", "change": 1.5 }
  ],
  "message": "Sector performance retrieved"
}
```

---

## Tool Service

### Get Dividend Calendar
`GET /dividends/calendar`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "symbol": "JKH",
      "company": "John Keells Holdings",
      "type": "Final" | "Interim",
      "amount": 1.50,
      "exDate": "YYYY-MM-DD",
      "payDate": "YYYY-MM-DD"
    }
  ],
  "message": "Dividend calendar retrieved"
}
```

### Get Brokers List
`GET /brokers`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "license": "string",
      "rating": 4.8,
      "location": "string",
      "phone": "string",
      "website": "string",
      "onlineTrading": true,
      "mobileApp": true,
      "minDeposit": "string",
      "fees": "string"
    }
  ],
  "message": "Brokers retrieved"
}
```

### Get Technical Analysis Data
`GET /technical/:symbol`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "string", // or timestamp
      "price": 100.50,
      "sma": 101.20,
      "ema": 100.80,
      "volume": 5000
    }
  ],
  "message": "Technical data retrieved"
}
```

---

## Proposed Endpoints (UI Requirements)

### Join Waitlist
`POST /waitlist`

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Successfully joined the waitlist"
}
```

**Validation:**
*   Email must be valid format.
*   Email must not already be in waitlist (optional).

### Get AI Prediction
`GET /predictions/:symbol`

**Response:**
```json
{
  "success": true,
  "data": {
    "symbol": "JKH",
    "currentPrice": 185.50,
    "predictedPrice": 192.50,
    "timeframe": "7d",
    "sentiment": "Bullish",
    "confidence": 0.85,
    "analysis": "Strong buy signals based on recent volume..."
  },
  "message": "Prediction generated"
}
```

### Upload Document (RAG)
`POST /documents/upload`

**Request Body:**
*   `file`: Binary (PDF/DOCX)

**Response:**
```json
{
  "success": true,
  "data": {
    "documentId": "string",
    "filename": "annual_report_2024.pdf",
    "status": "processing" | "ready"
  },
  "message": "File uploaded successfully"
}
```

### Analyze Document (RAG)
`POST /documents/analyze`

**Request Body:**
```json
{
  "documentId": "string",
  "query": "What is the net profit?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "The net profit for 2024 was...",
    "citations": [
      { "page": 45, "text": "..." }
    ]
  },
  "message": "Analysis complete"
}
```

### Get Wiki Topics
`GET /wiki/topics`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "What is a stock exchange?",
      "category": "Basics",
      "isRead": false
    }
  ],
  "message": "Topics retrieved"
}
```

### Mark Wiki Topic as Read
`POST /wiki/progress`

**Request Body:**
```json
{
  "topicId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "progress": 0.5 // Percentage complete
  },
  "message": "Progress updated"
}
```
