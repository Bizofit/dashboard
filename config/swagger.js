const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bizoforce Unified Dashboard API',
      version: '1.0.0',
      description: `
# Bizoforce Unified Dashboard API Documentation

Comprehensive REST API for the Bizoforce ecosystem, consolidating multiple platforms:
- **Unified DB**: Master user registry and authentication
- **Bizoforce**: WordPress/WooCommerce marketplace (198K+ users)
- **Giglancer**: Job marketplace (82K+ users)
- **Screenly**: AI screening platform (24 users)
- **Work.Bizoforce**: Project management & timesheets (1.1K users)

## Authentication

All protected endpoints require Bearer token authentication:

\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

Obtain tokens via:
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/google

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP address

## Response Format

All endpoints return consistent JSON structure:

**Success Response**:
\`\`\`json
{
  "success": true,
  "count": 10,
  "data": [...],
  "message": "Operation successful"
}
\`\`\`

**Error Response**:
\`\`\`json
{
  "success": false,
  "message": "Error description"
}
\`\`\`

## Business Goals

This API enables:
- **Lead Generation**: Unified talent pool aggregation
- **Sales Enablement**: Marketplace for products/services
- **Talent Acquisition**: AI-powered screening & hiring
- **Project Management**: Timesheets, billing, resource allocation
      `,
      contact: {
        name: 'Bizoforce API Support',
        email: 'support@bizoforce.com',
        url: 'https://bizoforce.com'
      },
      license: {
        name: 'Private',
        url: 'https://bizoforce.com/license'
      }
    },
    servers: [
      {
        url: 'http://localhost:3006',
        description: 'Development server'
      },
      {
        url: 'https://api.bizoforce.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from login endpoint'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message description'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'deactivated'],
              example: 'active'
            },
            company_id: {
              type: 'integer',
              example: 1
            },
            hourly_rate: {
              type: 'number',
              format: 'float',
              example: 50.00
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-15T10:30:00Z'
            }
          }
        },
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 10
            },
            project_name: {
              type: 'string',
              example: 'Website Redesign'
            },
            start_date: {
              type: 'string',
              format: 'date',
              example: '2024-12-01'
            },
            deadline: {
              type: 'string',
              format: 'date',
              example: '2025-03-01'
            },
            status: {
              type: 'string',
              enum: ['not started', 'in progress', 'on hold', 'cancelled', 'finished'],
              example: 'in progress'
            },
            budget: {
              type: 'number',
              format: 'float',
              example: 50000.00
            },
            client_id: {
              type: 'integer',
              example: 5
            },
            task_count: {
              type: 'integer',
              example: 25
            },
            member_count: {
              type: 'integer',
              example: 4
            },
            total_hours: {
              type: 'number',
              format: 'float',
              example: 120.5
            }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 50
            },
            heading: {
              type: 'string',
              example: 'Implement login page'
            },
            description: {
              type: 'string',
              example: 'Create responsive login page with validation'
            },
            project_id: {
              type: 'integer',
              example: 10
            },
            status: {
              type: 'string',
              enum: ['incomplete', 'complete'],
              example: 'incomplete'
            },
            due_date: {
              type: 'string',
              format: 'date',
              example: '2025-01-20'
            },
            assigned_to: {
              type: 'integer',
              example: 1
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              example: 'high'
            }
          }
        },
        TimeLog: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1001
            },
            user_id: {
              type: 'integer',
              example: 1
            },
            project_id: {
              type: 'integer',
              example: 10
            },
            task_id: {
              type: 'integer',
              example: 50
            },
            start_time: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-13T09:00:00Z'
            },
            end_time: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-13T17:00:00Z'
            },
            total_hours: {
              type: 'number',
              format: 'float',
              example: 8.0
            },
            approved: {
              type: 'integer',
              enum: [0, 1],
              example: 1
            },
            memo: {
              type: 'string',
              example: 'Frontend development work'
            }
          }
        },
        Invoice: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            invoice_number: {
              type: 'string',
              example: 'INV-2025-001'
            },
            client_id: {
              type: 'integer',
              example: 5
            },
            project_id: {
              type: 'integer',
              example: 10
            },
            subtotal: {
              type: 'number',
              format: 'float',
              example: 5000.00
            },
            tax: {
              type: 'number',
              format: 'float',
              example: 500.00
            },
            total: {
              type: 'number',
              format: 'float',
              example: 5500.00
            },
            status: {
              type: 'string',
              enum: ['unpaid', 'paid', 'partial', 'cancelled'],
              example: 'unpaid'
            },
            issue_date: {
              type: 'string',
              format: 'date',
              example: '2025-01-10'
            },
            due_date: {
              type: 'string',
              format: 'date',
              example: '2025-02-10'
            }
          }
        },
        Client: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 5
            },
            company_name: {
              type: 'string',
              example: 'Acme Corporation'
            },
            name: {
              type: 'string',
              example: 'John Smith'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@acme.com'
            },
            website: {
              type: 'string',
              format: 'uri',
              example: 'https://acme.com'
            },
            project_count: {
              type: 'integer',
              example: 3
            },
            invoice_count: {
              type: 'integer',
              example: 8
            }
          }
        },
        Team: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            team_name: {
              type: 'string',
              example: 'Development Team'
            },
            member_count: {
              type: 'integer',
              example: 8
            },
            project_count: {
              type: 'integer',
              example: 4
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Invalid or expired token'
              }
            }
          }
        },
        NotFoundError: {
          description: 'The specified resource was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Resource not found'
              }
            }
          }
        },
        ValidationError: {
          description: 'Request validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Invalid request data'
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      },
      {
        name: 'Users',
        description: 'User management and employee operations'
      },
      {
        name: 'Projects',
        description: 'Project management operations'
      },
      {
        name: 'Tasks',
        description: 'Task management and tracking'
      },
      {
        name: 'Time Logs',
        description: 'Timesheet and time tracking operations'
      },
      {
        name: 'Invoices',
        description: 'Invoice generation and management'
      },
      {
        name: 'Clients',
        description: 'Client management operations'
      },
      {
        name: 'Teams',
        description: 'Team management and organization'
      },
      {
        name: 'Reports',
        description: 'Analytics and reporting endpoints'
      }
    ]
  },
  apis: [
    './routes/*.js',
    './server.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
