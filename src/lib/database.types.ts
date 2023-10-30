export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      _userFriends: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_userFriends_A_fkey"
            columns: ["A"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_userFriends_B_fkey"
            columns: ["B"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      FriendRequest: {
        Row: {
          fromUserID: string
          id: string
          status: Database["public"]["Enums"]["FriendRequestStatus"]
        }
        Insert: {
          fromUserID: string
          id: string
          status: Database["public"]["Enums"]["FriendRequestStatus"]
        }
        Update: {
          fromUserID?: string
          id?: string
          status?: Database["public"]["Enums"]["FriendRequestStatus"]
        }
        Relationships: [
          {
            foreignKeyName: "FriendRequest_fromUserID_fkey"
            columns: ["fromUserID"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Server: {
        Row: {
          id: string
          name: string
          profilePicture: string
        }
        Insert: {
          id: string
          name: string
          profilePicture: string
        }
        Update: {
          id?: string
          name?: string
          profilePicture?: string
        }
        Relationships: []
      }
      ServerMember: {
        Row: {
          serverId: string
          userId: string
        }
        Insert: {
          serverId: string
          userId: string
        }
        Update: {
          serverId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ServerMember_serverId_fkey"
            columns: ["serverId"]
            referencedRelation: "Server"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ServerMember_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          bio: string
          createdAt: string
          displayName: string
          email: string
          id: string
          profilePicture: string
          provider: Database["public"]["Enums"]["AcccountProvider"][] | null
          username: string
        }
        Insert: {
          bio?: string
          createdAt?: string
          displayName: string
          email: string
          id: string
          profilePicture: string
          provider?: Database["public"]["Enums"]["AcccountProvider"][] | null
          username: string
        }
        Update: {
          bio?: string
          createdAt?: string
          displayName?: string
          email?: string
          id?: string
          profilePicture?: string
          provider?: Database["public"]["Enums"]["AcccountProvider"][] | null
          username?: string
        }
        Relationships: []
      }
      UserDefaultImage: {
        Row: {
          email: string
          id: string
        }
        Insert: {
          email: string
          id: string
        }
        Update: {
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      AcccountProvider: "google"
      FriendRequestStatus: "PENDING" | "REJECTED" | "BLOCKED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
