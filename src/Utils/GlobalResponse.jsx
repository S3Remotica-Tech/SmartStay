
export function GlobalHostelId(response) {
  const hostelId = String(response?.data?.hostelId || "");
  return hostelId;
}
