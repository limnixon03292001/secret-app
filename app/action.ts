"use server";

import { mapRegions } from "@/data/philippinesData";
import { auth, ErrorCodes } from "@/lib/auth";
import transporter from "@/lib/nodemailer";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpEmailAction(formData: FormData) {
  const username = String(formData.get("username"));
  if (!username) return { error: "Please enter your username." };

  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password." };

  try {
    await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
    });

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCodes) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again!" };

        default:
          return { error: err.message };
      }
    }
    return { error: "Internal Server Error" };
  }
}

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password." };
  //when working in server actions with next js we need to work with cookies api to set the cookie
  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      // asResponse: true,
    });

    //-----MANUAL  WAY OF SETTING COOKIES
    // const setCookieHeader = res.headers.get("set-cookie");
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   const cookieStore = await cookies();

    //   const [key, cookieAttributes] = [...cookie.entries()][0];

    //   const value = cookieAttributes.value;
    //   const maxAge = cookieAttributes["max-age"];
    //   const path = cookieAttributes.path;
    //   const httpOnly = cookieAttributes.httponly;
    //   const sameSite = cookieAttributes.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }
    //----- END MANUAL  WAY OF SETTING COOKIES

    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCodes) : "UNKNOWN";

      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");

        default:
          return { error: err.message };
      }
    }
    return { error: "Internal Server Error" };
  }
}

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `${subject} - ConquerPH`,
    html:
      subject !== "Reset Your Password"
        ? `<div style="width:100%;background-color:#f5f5f5;padding:40px 20px;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:0 auto;background-color:#0A1628;
      border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

      <!-- Header -->
      <tr>
        <td style="padding:40px 40px 30px;">
          <table role="presentation" width="100%">
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="font-size:24px;font-weight:700;color:white;letter-spacing:0.5px;">
                    Conquer<span style="color:#00D9FF;">PH</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Main Content -->
      <tr>
        <td style="padding:0 40px 40px;">
          <table role="presentation" width="100%">

            <tr>
              <td style="padding-bottom:24px;">
                <h1 style="margin:0;font-size:32px;font-weight:700;
                  color:white;line-height:1.2;">
                  ${subject}
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:16px;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#B8C5D6;">
                  Welcome to ConquerPH! We're excited to have you on board.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:32px;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#B8C5D6;">
                  To get started exploring every corner of the Philippines,
                  tracking your travels, and unlocking achievements, please
                  verify your email address by clicking the button below.
                </p>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td style="padding-bottom:24px;">
                <a href="${meta.link}"
                  style="display:inline-block;padding:16px 48px;
                  background:linear-gradient(135deg,#00D9FF 0%,#7B61FF 100%);
                  color:white;font-size:16px;font-weight:600;
                  text-decoration:none;border-radius:8px;
                  text-align:center;letter-spacing:0.5px;">
                  Verify Email Address
                </a>
              </td>
            </tr>

            <!-- Alternative Link -->
            <tr>
              <td style="padding-bottom:32px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#7B8A9E;">
                  Or copy and paste this link into your browser:
                </p>
                <a href="${meta.link}"
                  style="display:block;margin-top:8px;font-size:14px;
                  color:#00D9FF;text-decoration:none;word-break:break-all;">
                  ${meta.link}
                </a>
              </td>
            </tr>

            <!-- Expiration Notice -->
            <tr>
              <td style="padding:24px;background-color:rgba(0,217,255,0.1);
                border-radius:6px;border-left:3px solid #00D9FF;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#B8C5D6;">
                  <strong style="color:#00D9FF;">Note:</strong>
                  This verification link will expire in 1 hour.
                  If you didn't create an account with ConquerPH,
                  you can safely ignore this email.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:32px 40px;
          border-top:1px solid rgba(255,255,255,0.1);">

          <p style="margin:0 0 16px 0;font-size:14px;
            line-height:1.6;color:#7B8A9E;text-align:center;">
            Need help? Contact us at
            <a href="mailto:itonski29@gmail.com"
              style="color:#00D9FF;text-decoration:none;">
              itonski29@gmail.com
            </a>
          </p>

          <p style="margin:0;font-size:12px;
            line-height:1.6;color:#5A6B7F;text-align:center;">
            © 2026 ConquerPH. All rights reserved.<br/>
            Track your travels across all 82 provinces of the Philippines.
          </p>
        </td>
      </tr>

    </table>
  </div>
    `
        : `<div style="width:100%;background-color:#f5f5f5;padding:40px 20px;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:0 auto;background-color:#0A1628;
      border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">

      <!-- Header -->
      <tr>
        <td style="padding:40px 40px 30px;">
          <table role="presentation" width="100%">
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="font-size:24px;font-weight:700;color:white;letter-spacing:0.5px;">
                    Conquer<span style="color:#00D9FF;">PH</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Main Content -->
      <tr>
        <td style="padding:0 40px 40px;">
          <table role="presentation" width="100%">

            <tr>
              <td style="padding-bottom:24px;">
                <h1 style="margin:0;font-size:32px;font-weight:700;
                  color:white;line-height:1.2;">
                  ${subject}
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:32px;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#B8C5D6;">
                 To reset your password, click the button below.
                </p>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td style="padding-bottom:24px;">
                <a href="${meta.link}"
                  style="display:inline-block;padding:16px 48px;
                  background:linear-gradient(135deg,#00D9FF 0%,#7B61FF 100%);
                  color:white;font-size:16px;font-weight:600;
                  text-decoration:none;border-radius:8px;
                  text-align:center;letter-spacing:0.5px;">
                  Reset Password
                </a>
              </td>
            </tr>

            <!-- Alternative Link -->
            <tr>
              <td style="padding-bottom:32px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#7B8A9E;">
                  Or copy and paste this link into your browser:
                </p>
                <a href="${meta.link}"
                  style="display:block;margin-top:8px;font-size:14px;
                  color:#00D9FF;text-decoration:none;word-break:break-all;">
                  ${meta.link}
                </a>
              </td>
            </tr>

            <!-- Expiration Notice -->
            <tr>
              <td style="padding:24px;background-color:rgba(0,217,255,0.1);
                border-radius:6px;border-left:3px solid #00D9FF;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#B8C5D6;">
                  <strong style="color:#00D9FF;">Note:</strong>
                  This link will expire in 1 hour
                  If you didn't create an account with ConquerPH,
                  you can safely ignore this email.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:32px 40px;
          border-top:1px solid rgba(255,255,255,0.1);">

          <p style="margin:0 0 16px 0;font-size:14px;
            line-height:1.6;color:#7B8A9E;text-align:center;">
            Need help? Contact us at
            <a href="mailto:itonski29@gmail.com"
              style="color:#00D9FF;text-decoration:none;">
              itonski29@gmail.com
            </a>
          </p>

          <p style="margin:0;font-size:12px;
            line-height:1.6;color:#5A6B7F;text-align:center;">
            © 2026 ConquerPH. All rights reserved.<br/>
            Track your travels across all 82 provinces of the Philippines.
          </p>
        </td>
      </tr>

    </table>
  </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("sendEmailAction", err);
    return { success: false };
  }
}

// to be deleted
export async function checkLocationAction(lat: number, lng: number) {
  if (!lat || !lng) {
    throw new Error("Missing coordinates");
  }

  // console.log("server action lat lng", lat, lng);

  const googleApi = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`,
  );

  const data = await googleApi.json();

  if (!data.results.length) {
    throw new Error(
      "Unable to determine the location from the provided coordinates.",
    );
  }

  // const components = data.results[0].address_components;

  // const province = components.find((c: any) =>
  //   c.types.includes("administrative_area_level_1"),
  // )?.long_name;

  // const city = components.find(
  //   (c: any) =>
  //     c.types.includes("locality") ||
  //     c.types.includes("administrative_area_level_2"),
  // )?.long_name;

  // console.log("Province:", province, "City:", city, data.results);

  const addressComponents = data.results[0].address_components.map(
    (i: { short_name: string }) => i.short_name.toLowerCase(),
  );

  const result = mapRegions.find((item) => {
    const lowerTitle = item.title.toLowerCase();

    // const matchesFormatted = data.results[0].address_components.find(
    //   (i: { short_name: string }) => {
    //     return i.short_name.toLowerCase().includes(lowerTitle);
    //   },
    // );

    const matchesFormatted = addressComponents.some((shortName: string) =>
      shortName.includes(lowerTitle),
    );
    return matchesFormatted;
  });

  if (result === undefined) {
    throw new Error(
      "We’re unable to map your current location in our system. This may be because you’re using a VPN connected to another country or you’re currently outside the country.",
    );
  }

  return { filteredResult: result, apiResult: data.results };
}
