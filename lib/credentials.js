const { OAuth2Client } = require('google-auth-library')

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
export const getDecodedOAuthJwtGoogle = async token => {

  const CLIENT_ID_GOOGLE = '93183711763-boe87qj6thsf6m1m1j5v1q9773civoch.apps.googleusercontent.com'

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE)

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    })

    return ticket
  } catch (error) {
    return { status: 500, data: error }
  }
}