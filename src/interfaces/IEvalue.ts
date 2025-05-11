export interface IEvalue {
    id: number;
    rating: number; // tinyint(4) with CHECK constraint between 1 and 5
    content: string | null; // text that can be null
    user_id: number;
    advice_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface IEvalueResponse {
  id: number;
  rating: number;
  content: string | null;
  user_id: number;
  advice_id: number;
  created_at: Date;
  updated_at: Date;
  user: {
    created_at: Date;
    full_name: string;
    proof: string;
  };
}