export interface IEvalue {
    id: number;
    rating: number; // tinyint(4) with CHECK constraint between 1 and 5
    content: string | null; // text that can be null
    advice_id: number;
    user_id: number; // Add this for update operations
    created_at: Date;
    updated_at: Date;
    user: {
        user_id: number;
        created_at: Date | null;
        full_name: string | null;
        proof: string | null;
    };
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