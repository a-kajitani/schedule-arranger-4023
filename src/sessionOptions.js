module.exports = {
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters",
  cookieName: "session", // Cookieの名前（任意）
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // 本番環境ではHTTPSのみ
    httpOnly: true, // JavaScriptからアクセス不可（セキュリティ向上）
    sameSite: "lax", // クロスサイトリクエスト対策
  },
};
