export async function GET(request, { params }) {
  const mockData = {
    recents: [
      { id: 1, name: "Recent Email 1", date: "2025-05-25" },
      { id: 2, name: "Recent Email 2", date: "2025-05-24" },
      { id: 3, name: "Recent Email 3", date: "2025-05-23" }
    ],
    orgId: params.orgId
  };

  return Response.json(mockData);
}
