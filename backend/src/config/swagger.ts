import { forgotPassword } from "../controllers/auth.controller";

export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Real Estate API",
    version: "1.0.0",
    description: "API documentation for auth and property management",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Local server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "Property", description: "Property endpoints" },
    { name: "User", description: "User profile and Favorites" },
    { name: "Admin", description: "Administrative dashboard metrics" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: { type: "string", example: "123456" },
          role: {
            type: "string",
            enum: ["user", "agent", "admin"],
            example: "user",
          },
        },
      },
      VerifyEmailRequest: {
        type: "object",
        required: ["email", "otp"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          otp: { type: "string", example: "123456" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: { type: "string", example: "123456" },
        },
      },
      forgotPasswordRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
        },
      },

      resetPasswordRequest: {
        type: "object",
        required: ["email", "otp", "newPassword"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          otp: { type: "string", example: "123456" },
          newPassword: { type: "string", example: "123456" },
        },
      },
      UpdateProfileRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "John Wick" },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          city: { type: "string", example: "Kolkata" },
          district: { type: "string", example: "Howrah" },
          locality: { type: "string", example: "Belur" },
          phoneNo: { type: "number", example: 2314567894 },
          profilePic: {
            type: "string",
            format: "binary",
            description: "Profile picture file",
          },
        },
      },
      CreatePropertyRequest: {
        type: "object",
        required: ["title", "description", "price", "address"],
        properties: {
          title: { type: "string", example: "2BHK Apartment" },
          description: { type: "string", example: "Near metro station" },
          price: { type: "number", example: 7800000 },
          address: { type: "string", example: "Kolkata, India" },
          bhkType: { type: "string", example: "2BHK" },
          sqFt: { type: "string", example: "1200" },
          apartmentType: { type: "string", example: "Apartment" },
          propertyType: {
            type: "string",
            enum: ["home", "office", "villa", "apartment", "rental"],
            example: "apartment",
          },
          projectStatus: {
            type: "string",
            enum: ["Completed", "Ongoing"],
            example: "Completed",
          },
          image: { type: "string", format: "binary" },
        },
      },
      UpdatePropertyRequest: {
        type: "object",
        properties: {
          title: { type: "string", example: "3BHK Apartment" },
          description: { type: "string", example: "Renovated recently" },
          price: { type: "number", example: 8200000 },
          address: { type: "string", example: "New Town, Kolkata" },
          bhkType: { type: "string", example: "3BHK" },
          sqFt: { type: "string", example: "1400" },
          apartmentType: { type: "string", example: "Penthouse" },
          propertyType: {
            type: "string",
            enum: ["home", "office", "villa", "apartment", "rental"],
            example: "villa",
          },
          projectStatus: {
            type: "string",
            enum: ["Completed", "Ongoing"],
            example: "Ongoing",
          },
          image: { type: "string", format: "binary" },
        },
      },
      Property: {
        type: "object",
        properties: {
          _id: { type: "string", example: "680f5a2d8a9850bf61d4c9f7" },
          title: { type: "string", example: "2BHK Apartment" },
          description: { type: "string", example: "Near metro station" },
          price: { type: "number", example: 7800000 },
          address: { type: "string", example: "Kolkata, India" },
          bhk: { type: "string", example: "2BHK" },
          sqft: { type: "string", example: "1200" },
          apartmentType: { type: "string", example: "Apartment" },
          propertyType: { type: "string", example: "apartment" },
          projectStatus: {
            type: "string",
            enum: ["Completed", "Ongoing"],
            example: "Completed",
          },
          createdBy: {
            type: "object",
            properties: {
              _id: { type: "string", example: "680f59388a9850bf61d4c9ef" },
              name: { type: "string", example: "John Doe" },
              email: { type: "string", example: "john@example.com" },
              role: { type: "string", example: "agent" },
            },
          },
          ownerId: {
            type: "object",
            properties: {
              _id: { type: "string", example: "680f59388a9850bf61d4c9eg" },
              name: { type: "string", example: "Manish Sharma" },
              email: { type: "string", example: "manish@example.com" },
              role: { type: "string", example: "user" },
            },
          },
          image: {
            type: "string",
            nullable: true,
            description: "Base64 data URL for the property image",
          },
          likesCount: { type: "number", example: 2 },
          likes: {
            type: "array",
            items: { type: "string" },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register user/agent/admin",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": { description: "Registered successfully" },
          "400": { description: "Validation or duplicate user error" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/auth/verify-email": {
      post: {
        tags: ["Auth"],
        summary: "Verify user email with OTP",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VerifyEmailRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Email verified successfully" },
          "400": { description: "Invalid or expired OTP" },
          "404": { description: "User not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and get JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Login successful" },
          "400": { description: "Invalid credentials / unverified email" },
          "404": { description: "User not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/auth/forgot-password": {
      post: {
        tags: ["Auth"],
        summary: "Forgot Password user/agent/admin",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/forgotPasswordRequest" },
            },
          },
        },
        responses: {
          "200": { description: "OTP sent to email" },
          "404": { description: "User not found" },
          "400": { description: "Could not send email" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/auth/reset-password": {
      post: {
        tags: ["Auth"],
        summary: "Reset password using otp , email and newpassword",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/resetPasswordRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Password reset successful. You can now login.",
          },
          "400": { description: "Invalid or expired OTP" },
          "404": { description: "User not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/properties": {
      get: {
        tags: ["Property"],
        summary: "Get all properties",
        parameters: [
          {
            in: "query",
            name: "projectStatus",
            required: false,
            schema: {
              type: "string",
              enum: ["Completed", "Ongoing"],
            },
            description: "Filter properties by project status",
          },
        ],
        responses: {
          "200": {
            description: "List of properties",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Property" },
                },
              },
            },
          },
          "500": { description: "Server error" },
        },
      },
      post: {
        tags: ["Property"],
        summary: "Create property (agent/admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/CreatePropertyRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Property created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Property" },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "403": { description: "Forbidden" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/properties/{id}": {
      get: {
        tags: ["Property"],
        summary: "Get property by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Property details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Property" },
              },
            },
          },
          "404": { description: "Property not found" },
          "500": { description: "Server error" },
        },
      },
      put: {
        tags: ["Property"],
        summary: "Update property (agent/admin, owner or admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/UpdatePropertyRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Property updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Property" },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "403": { description: "Forbidden" },
          "404": { description: "Property not found" },
          "500": { description: "Server error" },
        },
      },
      delete: {
        tags: ["Property"],
        summary: "Delete property (agent/admin, owner or admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Property deleted" },
          "401": { description: "Unauthorized" },
          "403": { description: "Forbidden" },
          "404": { description: "Property not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/properties/{id}/like": {
      post: {
        tags: ["Property"],
        summary: "Toggle like on property (authenticated user)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Like toggled",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Property liked" },
                    liked: { type: "boolean", example: true },
                    likesCount: { type: "number", example: 3 },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized" },
          "404": { description: "Property not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/users/profile/{id}": {
      get: {
        tags: ["User"],
        summary: "Get user profile",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "User details" },
          "404": { description: "Not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/users/profile/update": {
      put: {
        tags: ["User"],
        summary: "Update own profile (supports image upload)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/UpdateProfileRequest" },
            },
          },
        },
        responses: {
          "200": { description: "Updated" },
          "401": { description: "Unauthorized" },
          "404": { description: "User not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/users/favorites/{propertyId}": {
      post: {
        tags: ["User"],
        summary: "Toggle like/favorite on a property",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "propertyId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Toggle success" },
          "401": { description: "Unauthorized" },
          "404": { description: "Property not found" },
          "500": { description: "Server error" },
        },
      },
    },
    "/api/users/favorites/my-list": {
      get: {
        tags: ["User"],
        summary: "Get all properties liked by current user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "List of liked properties" },
          "401": { description: "Unauthorized" },
          "500": { description: "Server error" },
        },
      },
    },



    //search engine for chat system for all user
    "/api/users/search-user-to-chat": {
      get: {
        tags: ["Users"],
        summary: "Fetch contextual chat contact sidebar based on user role",
        description: "Returns a dynamic list of relevant chat contacts with their latest message previews. If logged in as a USER, it returns available Admins/Agents. If logged in as an ADMIN/AGENT, it returns regular Users. Accessible by all authenticated accounts.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "search",
            schema: { type: "string" },
            required: false,
            description: "Case-insensitive string to filter contact profiles by name"
          }
        ],
        responses: {
          "200": {
            description: "Contextual contact sidebar dataset populated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c1", description: "Unique database ID of the contact" },
                      name: { type: "string", example: "Ankit Shaw" },
                      locality: { type: "string", example: "Belur" },
                      district: { type: "string", example: "Howrah" },
                      role: { type: "string", example: "USER", enum: ["ADMIN", "USER", "AGENT"] },
                      latestMessageText: { type: "string", example: "Hello, I need help with my listing." },
                      latestMessageTime: { type: "string", format: "date-time", example: "2026-05-31T15:30:00.000Z" },
                      profilePic: {
                        type: "object",
                        description: "Profile image attachment object reference metadata map"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": { description: "Unauthorized: Missing, malformed, or expired token payload structure" },
          "500": { description: "Internal Server Error: Database aggregation lookup pipeline issue" }
        }
      }
    },



    "/api/users/history/{userId}": {
      get: {
        tags: ["Users"],
        summary: "Fetch bidirectional chat history grouped by calendar timeline",
        description: "Retrieves the complete message trail exchanged between the currently authenticated session account and a specified target user. Automatically organizes the payload into a chronological timeline bucket structure (e.g., 'Today', 'Yesterday', or 'MMM DD, YYYY') for chat layout mapping. Accessible by Admin, User, or Agent accounts.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              type: "string",
              example: "65f1a2b3c4d5e6f7a8b9c0c2"
            },
            description: "The unique MongoDB Object ID string of the target participant whose dialogue record context is being retrieved"
          }
        ],
        responses: {
          "200": {
            description: "Conversation history log matrix successfully generated and compiled",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userContext: {
                      type: "object",
                      description: "Profile metadata attributes summary of the chat participant",
                      properties: {
                        _id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c2" },
                        name: { type: "string", example: "John Doe" },
                        role: { type: "string", example: "AGENT", enum: ["ADMIN", "USER", "AGENT"] },
                        locality: { type: "string", example: "Belur" },
                        district: { type: "string", example: "Howrah" },
                        profilePic: { type: "string", nullable: true, example: null }
                      }
                    },
                    timeline: {
                      type: "object",
                      description: "Dynamic map of historical chronological categories containing conversation payload item records arrays",
                      additionalProperties: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: { type: "string", example: "6659f13ba4e6b52c0199d21c" },
                            senderId: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c1" },
                            receiverId: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c2" },
                            messageText: { type: "string", example: "Are there any 2BHK apartments available near Rangoli Mall?" },
                            isRead: { type: "boolean", example: true },
                            createdAt: { type: "string", format: "date-time", example: "2026-05-31T10:15:00.000Z" },
                            timeLabel: { type: "string", description: "Localized short clock string for chat bubble alignment markers", example: "10:15 AM" }
                          }
                        }
                      },
                      example: {
                        "Today": [
                          {
                            _id: "6659f13ba4e6b52c0199d21c",
                            senderId: "65f1a2b3c4d5e6f7a8b9c0c1",
                            receiverId: "65f1a2b3c4d5e6f7a8b9c0c2",
                            messageText: "Are there any 2BHK apartments available near Rangoli Mall?",
                            isRead: true,
                            createdAt: "2026-05-31T10:15:00.000Z",
                            timeLabel: "10:15 AM"
                          }
                        ],
                        "Yesterday": [
                          {
                            _id: "6658f01aa4e6b52c0199c10a",
                            senderId: "65f1a2b3c4d5e6f7a8b9c0c2",
                            receiverId: "65f1a2b3c4d5e6f7a8b9c0c1",
                            messageText: "Hello! Let me verify our active property index for that area.",
                            isRead: true,
                            createdAt: "2026-05-30T16:45:00.000Z",
                            timeLabel: "04:45 PM"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          "400": { description: "Bad Request: Target user parameter missing, format is invalid, or structural validation processing exception error rules tripped" },
          "401": { description: "Unauthorized: Access session identification headers trace context missing or invalid" },
          "404": { description: "Not Found: No profile data record mapping matching that reference user identifier could be verified" },
          "500": { description: "Internal Server Error: Pipeline exception tracking collection records or compiling timelines" }
        }
      }
    },



    "/api/users/chat/send": {
      post: {
        tags: ["Users"],
        summary: "Dispatch a new text message to another platform participant",
        description: "Creates and saves a new message document in the communication layer database. Facilitates open bidirectional interactions between Admins, Agents, or standard Users dynamically. Requires a valid security bearer token validation footprint.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["receiverId", "messageText"],
                properties: {
                  receiverId: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c2", description: "The unique MongoDB Object ID string of the targeted recipient account" },
                  messageText: { type: "string", example: "Hey, is that commercial warehouse unit still open for leasing?", description: "The raw content of the textual notification payload" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Message successfully created and recorded into data history logs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Message processed and dispatched successfully" },
                    data: {
                      type: "object",
                      properties: {
                        _id: { type: "string", example: "665a12fba4e6b52c0199f55a" },
                        senderId: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c1" },
                        receiverId: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c2" },
                        messageText: { type: "string", example: "Hey, is that commercial warehouse unit still open for leasing?" },
                        isRead: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time", example: "2026-05-31T16:30:00.000Z" },
                        timeLabel: { type: "string", example: "04:30 PM" }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": { description: "Bad Request: Target inputs structurally invalid, message body empty, or attempting self-transmission loop" },
          "401": { description: "Unauthorized: Missing, broken, or expired authentication token context map signatures" },
          "404": { description: "Not Found: Destination recipient user record structure profile does not exist within current records" },
          "500": { description: "Internal Server Error: Database write failure exception intercept occurred" }
        }
      }
    },



    "/api/users/my-notifications": {
    get: {
        tags: ["Notifications"],
        summary: "Retrieve logged-in user notifications",
        description: "Returns a personalized list of alerts (Role changes, Purchase status, Approvals) for the current session.",
        security: [{ bearerAuth: [] }],
        responses: {
            "200": {
                description: "List of notifications retrieved successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: { type: "boolean", example: true },
                                count: { type: "integer", example: 1 },
                                notifications: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string", example: "6a1c99f47801aa3029a16f01" },
                                            recipientId: { type: "string", example: "6a1c81117801aa3029a14a01" },
                                            type: { type: "string", example: "ROLE_CHANGED" },
                                            title: { type: "string", example: "💼 Account Role Updated" },
                                            messageText: { type: "string", example: "An administrator has updated your profile role authorization to: AGENT." },
                                            isRead: { type: "boolean", example: false },
                                            createdAt: { type: "string", example: "2026-06-01T16:59:00.069Z" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



  },



  "/api/admin/dashboard": {
    get: {
      tags: ["Admin"],
      summary: "Fetch consolidated admin dashboard metrics dataset",
      description: "Returns baseline summary metrics, recent active customer spotlights, time-series growth curves, user verification distributions, and regional concentration counts. Restricted to Admin personnel.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "timeframe",
          schema: { type: "string", enum: ["week", "month", "year"], default: "month" },
          required: false,
          description: "Temporal axis resolution selector used to calculate structural intervals for the growth chart timeline"
        }
      ],
      responses: {
        "200": {
          description: "Dashboard aggregate metrics calculated and collected successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  overviewMetrics: {
                    type: "object",
                    description: "Baseline numeric KPI counters representing platform transaction volumes",
                    properties: {
                      totalCustomers: { type: "integer", example: 120 },
                      listedProperties: { type: "integer", example: 45 },
                      closedDeals: { type: "integer", example: 15 },
                      pendingDeals: { type: "integer", example: 8 },
                      activeDeals: { type: "integer", example: 22 },
                      customerVisits: { type: "integer", example: 480 }
                    }
                  },
                  recentActiveCustomers: {
                    type: "array",
                    description: "Spotlight array containing operational data profiles of the 3 most recently updated users",
                    items: {
                      type: "object",
                      properties: {
                        _id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c1" },
                        name: { type: "string", example: "Ankit Shaw" },
                        locality: { type: "string", example: "Belur" },
                        district: { type: "string", example: "Howrah" },
                        profilePic: {
                          type: "object",
                          description: "Profile picture database image reference binary container parameters mapping object"
                        }
                      }
                    }
                  },
                  timelineGrowthGraph: {
                    type: "array",
                    description: "Chronological time-series coordinate map sequence compiled for UI data stream rendering models",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", description: "Label text string representing the X-Axis timeline position mapping", example: "Jan" },
                        enquiries: { type: "integer", description: "Numeric registration volumes representing the Y-Axis graph curve value", example: 40 }
                      }
                    }
                  },
                  verificationMetrics: {
                    type: "object",
                    description: "Proportional indicators tracking account verification splits for structural dashboard chart distributions",
                    properties: {
                      newUserUnverified: { type: "integer", example: 25 },
                      verifiedUser: { type: "integer", example: 90 },
                      returningUser: { type: "integer", example: 5 }
                    }
                  },
                  regionalDistribution: {
                    type: "array",
                    description: "Regional concentration statistics capturing top user density groups separated by area indices (Max 5 items)",
                    items: {
                      type: "object",
                      properties: {
                        districtName: { type: "string", example: "Howrah" },
                        userCount: { type: "integer", example: 68 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "401": { description: "Missing, malformed, or expired authorization bearer token authentication credentials context" },
        "403": { description: "Forbidden: Restricted access permissions map; administrative credentials required" },
        "500": { description: "Internal runtime server sorting loop error or aggregation pipeline validation exception" }
      }
    }
  },

  "/api/admin/customers-list": {
    get: {
      tags: ["Admin"],
      summary: "Retrieve a paginated grid list of normal users",
      description: "Returns a sliced matrix structure holding precisely up to 16 user document objects per query index view frame. If a search parameter string is supplied, it filters results across name and email attributes using an automated case-insensitive regex pattern check. Restricted to system administrators accounts.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            minimum: 1,
            default: 1
          },
          required: false,
          description: "Target context index pagination frame window sequence identifier selector parameter"
        },
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          required: false,
          description: "Optional case-insensitive string fragment matching customer name or email parameters values"
        }
      ],
      responses: {
        "200": {
          description: "Paginated administration overview customers schema log bundle constructed smoothly",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  pagination: {
                    type: "object",
                    properties: {
                      totalUsersCount: { type: "integer", example: 45 },
                      currentPage: { type: "integer", example: 1 },
                      totalPages: { type: "integer", example: 3 },
                      itemsPerPageLimit: { type: "integer", example: 16 },
                      hasNextPage: { type: "boolean", example: true },
                      hasPreviousPage: { type: "boolean", example: false }
                    }
                  },
                  customers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        customerId: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0c1" },
                        customerName: { type: "string", example: "Jil Yim" },
                        propertyType: { type: "string", example: "Apartment, Villa, Rental", description: "Comma-separated string list compiling all unique property types owned by the user account" },
                        email: { type: "string", example: "testuser@example.com" },
                        phoneNo: { type: "string", example: "+91 9876543210" },
                        status: { type: "string", example: "Verified", enum: ["Verified", "Unverified"] },
                        registrationDate: { type: "string", example: "31 May 2026" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "401": { description: "Unauthorized: Signature headers lookup token contextual authorization mismatch exception parameters trace" },
        "403": { description: "Forbidden: Client permissions configuration path map fails administrative access level rules checks validation constraints" },
        "500": { description: "Internal Server Error: Grouping lookup extraction query calculations exception tracking database operations" }
      }
    }
  },



  "/api/admin/admin-update-role/{userId}": {
    patch: {
        tags: ["Admin"],
        summary: "Update user profile details and role configurations by admin",
        description: "Allows an administrator to modify a specific user's personal details, upload/overwrite a profile picture, and change their account role (e.g., upgrading a normal user to an agent). Generates a dynamic notification for the target user if their role is modified.",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                in: "path",
                name: "userId",
                required: true,
                schema: { type: "string" },
                description: "The unique MongoDB Object ID of the target user whose profile/role needs alteration"
            }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["role"],
                        properties: {
                            role: { 
                                type: "string", 
                                enum: ["user", "agent", "admin"],
                                example: "agent",
                                description: "The authorization level assignment for the target user account"
                            },
                            name: { type: "string", example: "Ankit Shaw" },
                            email: { type: "string", example: "ankit@example.com" },
                            city: { type: "string", example: "Howrah" },
                            district: { type: "string", example: "Howrah" },
                            locality: { type: "string", example: "Liluah" },
                            phoneNo: { type: "number", example: 9876543210 }
                        }
                    }
                },
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        required: ["role"],
                        properties: {
                            role: { type: "string", enum: ["user", "agent", "admin"], example: "agent" },
                            name: { type: "string", example: "Ankit Shaw" },
                            email: { type: "string", example: "ankit@example.com" },
                            city: { type: "string", example: "Howrah" },
                            district: { type: "string", example: "Howrah" },
                            locality: { type: "string", example: "Liluah" },
                            phoneNo: { type: "number", example: 9876543210 },
                            file: { 
                                type: "string", 
                                format: "binary",
                                description: "Optional image file binary buffer to update the user profile picture" 
                            }
                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "User profile parameters and role states updated smoothly by admin",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string", example: "User role updated successfully by admin" },
                                user: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string", example: "6a1c688f7801aa3029a13ac0" },
                                        name: { type: "string", example: "Ankit Shaw" },
                                        email: { type: "string", example: "ankit@example.com" },
                                        city: { type: "string", example: "Howrah" },
                                        district: { type: "string", example: "Howrah" },
                                        locality: { type: "string", example: "Liluah" },
                                        phoneNo: { type: "number", example: 9876543210 },
                                        role: { type: "string", example: "agent" }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "400": { 
                description: "Bad Request: Missing required role parameter or invalid role enum values supplied" 
            },
            "401": { 
                description: "Unauthorized: Missing authentication token header elements" 
            },
            "403": { 
                description: "Forbidden: Client account lacks administrative privilege signatures" 
            },
            "404": { 
                description: "Not Found: Target user account index reference not verified in records database space" 
            },
            "500": { 
                description: "Internal Server Error: Execution exception tracking database file writes operations output map",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: { type: "boolean", example: false },
                                message: { type: "string", example: "Internal server error occurred" }
                            }
                        }
                    }
                }
            }
        }
    }
},







"/api/client/property/{propertyId}/inquiry": {
    post: {
        tags: ["Inquiries"],
        summary: "Submit a property contact inquiry with custom contact overrides",
        description: "Logs an inquiry request for a specified property. If name, email, or phone numbers are left empty in the body schema, fallback scripts auto-populate parameters using the buyer's session document profiles.",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                in: "path",
                name: "propertyId",
                required: true,
                schema: { type: "string" },
                example: "6a1c92a17801aa3029a15b01"
            }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["messageText"],
                        properties: {
                            messageText: { type: "string", example: "I would love to set up a walkthrough visit." },
                            name: { type: "string", description: "Optional override for contact name", example: "Ankit Shaw" },
                            email: { type: "string", description: "Optional override for contact email", example: "ankit@example.com" },
                            phoneNo: { type: "string", description: "Optional contact phone number", example: "+919876543210" }
                        }
                    }
                }
            }
        },
        responses: {
            "201": { description: "Inquiry dispatched successfully." },
            "400": { description: "Bad Request validation errors or active spam loops encountered." },
            "404": { description: "Property document reference index not found." }
        }
    }
},





"/api/agent/dashboard-summary": {
    get: {
        tags: ["Agent"],
        summary: "Retrieve key operational KPIs and data listings for the Agent Dashboard",
        description: "Returns aggregated metrics including total inquiries received, active available property counts, finalized sale assets, a structural dataset for chart rendering, and an array log containing all listings owned by the logged-in agent profile.",
        security: [{ bearerAuth: [] }],
        responses: {
            "200": {
                description: "Dashboard metrics aggregation matrix compiled successfully.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: { type: "boolean", example: true },
                                dashboardKPIs: {
                                    type: "object",
                                    properties: {
                                        totalInquiries: { type: "integer", example: 42 },
                                        propertiesSold: { type: "integer", example: 12 },
                                        propertiesAvailable: { type: "integer", example: 8 },
                                        totalInventoryCount: { type: "integer", example: 20 }
                                    }
                                },
                                pieChartData: {
                                    type: "object",
                                    properties: {
                                        labels: { 
                                            type: "array", 
                                            items: { type: "string" }, 
                                            example: ["Available Properties", "Sold Properties"] 
                                        },
                                        datasets: { 
                                            type: "array", 
                                            items: { type: "integer" }, 
                                            example: [8, 12] 
                                        }
                                    }
                                },
                                propertiesList: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string", example: "6a1c92a17801aa3029a15b01" },
                                            title: { type: "string", example: "Merlin Residentia 2BHK" },
                                            price: { type: "number", example: 6200000 },
                                            status: { type: "string", example: "Available" },
                                            propertyType: { type: "string", example: "apartment" },
                                            city: { type: "string", example: "Howrah" },
                                            locality: { type: "string", example: "Liluah" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "401": { description: "Unauthorized: Missing session context token signatures" },
            "403": { description: "Forbidden: Logged-in profile does not hold active AGENT credentials" },
            "500": { description: "Internal Server Error: Execution data engine pipeline matching exception" }
        }
    }
},



"/api/agent/inquiry/{inquiryId}/action": {
    patch: {
        tags: ["Inquiries"],
        summary: "Approve or disapprove an incoming inquiry lead",
        description: "Allows the assigned agent to process an inquiry. Approving an inquiry flips the corresponding property's status to 'Sold'.",
        security: [{ bearerAuth: [] }],
        parameters: [
            { in: "path", name: "inquiryId", required: true, schema: { type: "string" } }
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["action"],
                        properties: {
                            action: { type: "string", enum: ["approved", "disapproved"], example: "approved" }
                        }
                    }
                }
            }
        },
        responses: {
            "200": { description: "Inquiry processed and property ownership state modified smoothly." },
            "404": { description: "Inquiry row reference index mismatch." }
        }
    }
},





"/api/agent/agent/leads": {
    get: {
        tags: ["Agent"],
        summary: "Fetch paginated and searchable incoming property inquiry leads for the authenticated agent",
        description: "Retrieves active user inquiry form submissions linked to properties managed by the logged-in agent. Excludes soft-deleted records, supports optional case-insensitive name filtering, and limits results to 16 rows per page slice.",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                in: "query",
                name: "search",
                required: false,
                description: "An optional keyword string to filter incoming inquiries by the sender's name (case-insensitive regex search).",
                schema: { type: "string", example: "Ankit" }
            },
            {
                in: "query",
                name: "page",
                required: false,
                description: "The targeted page index number to fetch. Defaults to 1 if left unspecified.",
                schema: { type: "integer", default: 1, example: 1 }
            }
        ],
        responses: {
            "200": {
                description: "A split data slice of active filtered inquiry leads alongside pagination metrics.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: { type: "boolean", example: true },
                                pagination: {
                                    type: "object",
                                    properties: {
                                        totalLeads: { type: "integer", example: 3 },
                                        totalPages: { type: "integer", example: 1 },
                                        currentPage: { type: "integer", example: 1 },
                                        limit: { type: "integer", example: 16 }
                                    }
                                },
                                count: { type: "integer", example: 3 },
                                leads: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            _id: { type: "string", example: "6a1c9df87801aa3029a15f88" },
                                            name: { type: "string", example: "Ankit Shaw" },
                                            email: { type: "string", example: "ankit@example.com" },
                                            messageText: { type: "string", example: "I am interested in this apartment." },
                                            requestAction: { type: "string", example: "pending" },
                                            isDeleted: { type: "boolean", example: false },
                                            propertyId: {
                                                type: "object",
                                                properties: {
                                                    _id: { type: "string", example: "6a1c92a17801aa3029a15b01" },
                                                    title: { type: "string", example: "Merlin Residentia 2BHK" }
                                                }
                                            },
                                            createdAt: { type: "string", example: "2026-06-02T10:15:30.120Z" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "401": { description: "Unauthorized: Missing or invalid authentication token signatures." },
            "404": { description: "Not Found: No active inquiry records found matching specified parameters." },
            "500": { description: "Internal Server Error." }
        }
    }
},




"/api/agent/inquiry/{inquiryId}": {
    delete: {
        tags: ["Inquiries"],
        summary: "Soft delete a property inquiry tracking record",
        description: "Allows either the participating buyer (sender) or the property agent (recipient) to flag an inquiry record as deleted. This marks `isDeleted` as true, filtering it out from active application dash screens.",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                in: "path",
                name: "inquiryId",
                required: true,
                description: "The unique MongoDB Object ID of the contact submission to soft delete.",
                schema: { type: "string" },
                example: "6a1c9df87801aa3029a15f88"
            }
        ],
        responses: {
            "200": {
                description: "Inquiry record flagged as soft-deleted successfully.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string", example: "Inquiry row removed from view frames successfully." }
                            }
                        }
                    }
                }
            },
            "401": { description: "Unauthorized: Invalid or missing session context tokens." },
            "404": { description: "Not Found: Inquiry tracking record reference not found or user lacks ownership to delete it." },
            "500": { description: "Internal Server Error: Database write pipeline exception encountered." }
        }
    }
}





};
