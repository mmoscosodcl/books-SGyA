

# Base URL
BASE_URL="http://localhost:3000/api/books"

# --------------------------------------------------
# 1) LIST ALL
# --------------------------------------------------
curl -i "$BASE_URL"
echo

# --------------------------------------------------
# 2) GET BY ISBN13 (your two IDs)
# --------------------------------------------------
curl -i "$BASE_URL/978-0134494166"
echo

curl -i "$BASE_URL/978-0451524935"
echo

# --------------------------------------------------
# 3) CREATE (will fail with 400 if ISBN already exists in seed)
# --------------------------------------------------
curl -i -X POST "http://localhost:3000/api/books" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Refactoring 2nd",
    "autor": "Martin Fowler",
    "isbn13": "978-0134494167",
    "categoria": "Software",
    "formato": "Papel",
    "precio": 22.5,
    "stock": 8
  }'
echo

curl -i -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "1984",
    "autor": "George Orwell",
    "isbn13": "978-0451524935",
    "categoria": "Novel",
    "formato": "Papel",
    "precio": 12.5,
    "stock": 3
  }'
echo

# --------------------------------------------------
# 4) UPDATE PAPER BOOK (normal update)
# --------------------------------------------------
curl -i -X PUT "$BASE_URL/978-0134494166" \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 19.9,
    "stock": 2
  }'
echo

# --------------------------------------------------
# 5) UPDATE TO DIGITAL (rules: stock -> 9999, precio max 25.00)
# --------------------------------------------------
curl -i -X PUT "$BASE_URL/978-0451524935" \
  -H "Content-Type: application/json" \
  -d '{
    "formato": "Digital",
    "precio": 40,
    "stock": 1
  }'
echo

# verify normalization
curl -i "$BASE_URL/978-0451524935"
echo

# --------------------------------------------------
# 6) INVALID PRICE (precio <= 0 must fail)
# --------------------------------------------------
curl -i -X PUT "$BASE_URL/978-0134494166" \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 0
  }'
echo

# --------------------------------------------------
# 7) DISCONTINUED RULE
#    7.1 mark as discontinued
#    7.2 try mutate again (must fail)
#    7.3 try delete (must fail)
# --------------------------------------------------
curl -i -X PUT "$BASE_URL/978-0134494166" \
  -H "Content-Type: application/json" \
  -d '{
    "discontinued": true
  }'
echo

curl -i -X PUT "$BASE_URL/978-0134494166" \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 10
  }'
echo

curl -i -X DELETE "$BASE_URL/978-0134494166"
echo

# --------------------------------------------------
# 8) DELETE OTHER BOOK (if not discontinued)
# --------------------------------------------------
curl -i -X DELETE "$BASE_URL/978-0451524935"
echo

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTc4MTk4NzY0MDM1MF92MDVhZWc4MXAiLCJlbWFpbCI6Im1hbnVlbEBnbWFpbC5jb20iLCJpYXQiOjE3ODE5ODc2NzIsImV4cCI6MTc4MjA3NDA3Mn0.WqUo-3p7wcouFQFyg1B5N76WpGdOMzKXAIrV7MfapqA

curl -i -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTc4MTk4NzY0MDM1MF92MDVhZWc4MXAiLCJlbWFpbCI6Im1hbnVlbEBnbWFpbC5jb20iLCJpYXQiOjE3ODE5ODc2NzIsImV4cCI6MTc4MjA3NDA3Mn0.WqUo-3p7wcouFQFyg1B5N76WpGdOMzKXAIrV7MfapqA" \
  -d '{
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "isbn13": "978-0132350884",
    "categoria": "Software",
    "formato": "Papel",
    "precio": 18.5,
    "stock": 10
  }'


  curl -i -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTc4MTk4NzY0MDM1MF92MDVhZWc4MXAiLCJlbWFpbCI6Im1hbnVlbEBnbWFpbC5jb20iLCJpYXQiOjE3ODE5ODc2NzIsImV4cCI6MTc4MjA3NDA3Mn0.WqUo-3p7wcouFQFyg1B5N76WpGdOMzKXAIrV7MfapqA" \
  -d '{
    "titulo": "Ebook Test",
    "autor": "Author Demo",
    "isbn13": "978-9999999999",
    "categoria": "Tech",
    "formato": "Digital",
    "precio": 40,
    "stock": 1
  }'



  curl -i -X PUT http://localhost:3000/api/books/978-0134494166 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTc4MTk4NzY0MDM1MF92MDVhZWc4MXAiLCJlbWFpbCI6Im1hbnVlbEBnbWFpbC5jb20iLCJpYXQiOjE3ODE5ODc2NzIsImV4cCI6MTc4MjA3NDA3Mn0.WqUo-3p7wcouFQFyg1B5N76WpGdOMzKXAIrV7MfapqA" \
  -d '{
    "precio": 19.9,
    "stock": 2
  }'



  curl -i -X PUT http://localhost:3000/api/books/978-0134494166 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTc4MTk4NzY0MDM1MF92MDVhZWc4MXAiLCJlbWFpbCI6Im1hbnVlbEBnbWFpbC5jb20iLCJpYXQiOjE3ODE5ODc2NzIsImV4cCI6MTc4MjA3NDA3Mn0.WqUo-3p7wcouFQFyg1B5N76WpGdOMzKXAIrV7MfapqA" \
  -d '{
    "discontinued": true
  }'


  curl -i -X DELETE http://localhost:3000/api/books/978-0134494166 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTc4MTk4NzY0MDM1MF92MDVhZWc4MXAiLCJlbWFpbCI6Im1hbnVlbEBnbWFpbC5jb20iLCJpYXQiOjE3ODE5ODc2NzIsImV4cCI6MTc4MjA3NDA3Mn0.WqUo-3p7wcouFQFyg1B5N76WpGdOMzKXAIrV7MfapqA"


# Testing
# 1) Check env values
echo "$BASE_URL"
echo "$TOKEN"

# 2) Login and capture a fresh token
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@libreria.com","password":"password123"}')

echo "$LOGIN_RESPONSE"

# 3) Extract token (no jq needed)
TOKEN=$(echo "$LOGIN_RESPONSE" | sed -n 's/.*"access_token":"\([^"]*\)".*/\1/p')
echo "$TOKEN"

# 4) Call protected endpoint
curl -i "$BASE_URL/auth/analytics" \
  -H "Authorization: Bearer $TOKEN"