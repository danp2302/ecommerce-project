export async function GET() {
  const response = await fetch("http://localhost:9000/products");
  const products = await response.json();
  const prodData = products?.data;
  const message = products?.message;
  const statusCode = products?.code;
  if (response.ok) {
    return Response.json({ data: prodData });
  } else {
    return Response.json({
      message: message,
      success: false,
      code: statusCode,
    });
  }
}
