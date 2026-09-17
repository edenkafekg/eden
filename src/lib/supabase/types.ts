export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SessionType = "igra" | "cuvaonica";
export type SessionStatus = "active" | "closed";
export type DaycareBillingMode = "hourly" | "full_day";

export interface BillingLine {
  posLabel: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Database {
  public: {
    Tables: {
      staff: {
        Row: {
          id: string;
          name: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      shifts: {
        Row: {
          id: string;
          staff_id: string;
          started_at: string;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          staff_id: string;
          started_at?: string;
          ended_at?: string | null;
        };
        Update: {
          id?: string;
          staff_id?: string;
          started_at?: string;
          ended_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "shifts_staff_id_fkey";
            columns: ["staff_id"];
            isOneToOne: false;
            referencedRelation: "staff";
            referencedColumns: ["id"];
          },
        ];
      };
      sessions: {
        Row: {
          id: string;
          shift_id: string;
          type: SessionType;
          table_number: number | null;
          status: SessionStatus;
          checked_in_at: string;
          checked_out_at: string | null;
          billing_breakdown: BillingLine[] | null;
          subtotal_rsd: number | null;
          discount_percent: number;
          discount_rsd: number;
          total_rsd: number | null;
          daycare_billing_mode: DaycareBillingMode | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          shift_id: string;
          type: SessionType;
          table_number?: number | null;
          status?: SessionStatus;
          checked_in_at: string;
          checked_out_at?: string | null;
          billing_breakdown?: BillingLine[] | null;
          subtotal_rsd?: number | null;
          discount_percent?: number;
          discount_rsd?: number;
          total_rsd?: number | null;
          daycare_billing_mode?: DaycareBillingMode | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          shift_id?: string;
          type?: SessionType;
          table_number?: number | null;
          status?: SessionStatus;
          checked_in_at?: string;
          checked_out_at?: string | null;
          billing_breakdown?: BillingLine[] | null;
          subtotal_rsd?: number | null;
          discount_percent?: number;
          discount_rsd?: number;
          total_rsd?: number | null;
          daycare_billing_mode?: DaycareBillingMode | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_shift_id_fkey";
            columns: ["shift_id"];
            isOneToOne: false;
            referencedRelation: "shifts";
            referencedColumns: ["id"];
          },
        ];
      };
      session_children: {
        Row: {
          id: string;
          session_id: string;
          name: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          session_id: string;
          name: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          session_id?: string;
          name?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "session_children_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Staff = Database["public"]["Tables"]["staff"]["Row"];
export type Shift = Database["public"]["Tables"]["shifts"]["Row"];
export type Session = Database["public"]["Tables"]["sessions"]["Row"];
export type SessionChild = Database["public"]["Tables"]["session_children"]["Row"];

export type SessionWithChildren = Session & {
  session_children: SessionChild[];
  shifts?: Shift & { staff?: Staff };
};
