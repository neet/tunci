const BASE_URL = "https://api.endpoints.huggingface.cloud";

type Args = {
  params: Promise<{
    namespace: string;
    endpoint: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function GET(_: Request, context: Args): Promise<Response> {
  const params = await context.params;

  const url = new URL(
    `/v2/endpoint/${params.namespace}/${params.endpoint}/sse`,
    BASE_URL,
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
    },
  });

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const responseStream = new TransformStream();
  response.body.pipeTo(responseStream.writable);

  try {
    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    response.body.cancel();
    responseStream.writable.getWriter().close();
    throw error;
  }
}
