export interface PaginatedResponse<T> {
    data: T[];
    errors: string;
    message: string;
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    totalPages: number;
    totalRecords: number;
  }
  