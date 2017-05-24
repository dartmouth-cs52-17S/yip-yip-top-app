/* for CURL testing
const ROOT_URL = 'https://yip-yip.herokuapp.com/api';
# all posts get:

# create new post
curl -X POST -H "Content-Type: application/json" -d '{
    "text": "yooo~ what's new here?",
    "tags": "#newbieInTown",
    "coordinates":  [5, 6],
    "user_id": "603 123 1279"
}' "https://yip-yip.herokuapp.com/api/posts"

curl -X POST -H "Content-Type: application/json" -d '{
    "text": "yoo~ what's new ?",
    "tags": "#newbieInTown",
    "coordinates":  [5,6],
    "user_id": "123 345 3456"
}' "https://yip-yip.herokuapp.com/api/posts"


# fetch  by POSTID
curl -X GET "https://yip-yip.herokuapp.com/api/posts/59249187ff5aa5002228092e"

# delete by POSTID
curl -X DELETE "https://yip-yip.herokuapp.com/api/posts/POSTID"
*/
