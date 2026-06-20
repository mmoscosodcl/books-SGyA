

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