# API Design

## List of API's

### Authentication

- [POST] /v1/auth/login -> authenticate existing user
- [POST] /v1/auth/register or /auth/signup -> register a new user account
- [POST] /v1/auth/logout -> Invalidate user session/token
- [POST] /v1/auth/refresh-token -> Issues a new access token using refresh token

### User Management

- [GET] /v1/users/me -> fetch logged in user profile
- [PATCH] /v1/users/me -> Update user profile
- [DELETE] /v1/users/me -> delete user account

### Profile

- [POST] /v1/profiles/photos -> upload profile images to S3
- [GET] /v1/profiles/{userId} -> fetch a user's public profile
- [GET] /v1/profiles/photos/{photoId} -> remove profile images
- [PUT] /v1/profiles/preferences -> update match preferences based on age range,distance and gender

### Verification

<!-- facial recognition api's -->
- [POST] /v1/verification/facemap
- [GET] /v1/verification/facemap


### Health

- authentication health

### Media

- [POST] /media/photo

### User

- [POST] /v1/like/{like_user_id} -> when user like another user
- [GET] /v1/developers
- [POST] /v1/pass/{pass_user_id}
