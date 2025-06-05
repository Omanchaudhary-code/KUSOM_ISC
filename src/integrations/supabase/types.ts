export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      participants: {
        Row: {
          college: string | null
          dietary_preference: string | null
          email: string | null
          full_name: string | null
          id: number
          major: string | null
          phone: string | null
          team_id: number | null
          year_of_study: string | null
        }
        Insert: {
          college?: string | null
          dietary_preference?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          major?: string | null
          phone?: string | null
          team_id?: number | null
          year_of_study?: string | null
        }
        Update: {
          college?: string | null
          dietary_preference?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          major?: string | null
          phone?: string | null
          team_id?: number | null
          year_of_study?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          created_at: string
          id: string
          leader_email: string
          leader_name: string
          leader_phone: string
          payment_receipt_url: string
          project_idea: string
          registered_at: string | null
          team_member_1: string | null
          team_member_2: string | null
          team_member_3: string | null
          team_name: string
          team_size: number
          updated_at: string
          vegetarian_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          leader_email: string
          leader_name: string
          leader_phone: string
          payment_receipt_url: string
          project_idea?: string
          registered_at?: string | null
          team_member_1?: string | null
          team_member_2?: string | null
          team_member_3?: string | null
          team_name: string
          team_size: number
          updated_at?: string
          vegetarian_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          leader_email?: string
          leader_name?: string
          leader_phone?: string
          payment_receipt_url?: string
          project_idea?: string
          registered_at?: string | null
          team_member_1?: string | null
          team_member_2?: string | null
          team_member_3?: string | null
          team_name?: string
          team_size?: number
          updated_at?: string
          vegetarian_count?: number
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          id: number
          team_name: string
          team_size: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          team_name: string
          team_size: number
        }
        Update: {
          created_at?: string | null
          id?: number
          team_name?: string
          team_size?: number
        }
        Relationships: []
      }
    }
    Views: {
      registrations_view: {
        Row: {
          registered_at: string | null
          team_name: string | null
          team_size: number | null
          vegetarian_count: number | null
        }
        Insert: {
          registered_at?: never
          team_name?: string | null
          team_size?: number | null
          vegetarian_count?: number | null
        }
        Update: {
          registered_at?: never
          team_name?: string | null
          team_size?: number | null
          vegetarian_count?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_team_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
