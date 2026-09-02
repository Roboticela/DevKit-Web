export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function assertFound<T>(value: T | null | undefined, message: string): T {
  if (value == null) throw new ApiError(message, 404, "NOT_FOUND");
  return value;
}
