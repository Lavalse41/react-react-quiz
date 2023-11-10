export function createUnknownActionError(message?: string): Error {
  const error = new Error(message || "Action unknown");
  error.name = "UnknownActionError";
  return error;
}
