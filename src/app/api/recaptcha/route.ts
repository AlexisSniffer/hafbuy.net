export async function POST(req: Request) {
  const { recaptchaToken } = await req.json()

  const secretKey = process.env.RECAPTCHA
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`

  const verificationResponse = await fetch(verificationURL, {
    method: 'POST',
  })

  const verificationData = await verificationResponse.json()

  if (recaptchaToken && verificationData.success) {
    return Response.json({ success: true }, { status: 200 })
  } else {
    return Response.json(
      { success: true, error: 'Error en el reCAPTCHA.' },
      { status: 400 },
    )
  }
}
