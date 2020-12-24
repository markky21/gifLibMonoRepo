export interface SEARCH_GIPHY_RESPONSE {
  data: [];
  pagination: {
    total_count: number;
    count: number;
    offset: 0;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
