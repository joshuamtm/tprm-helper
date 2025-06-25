import { z } from 'zod';

export const contactInfoSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required').regex(/^[\d\s\-\(\)\+\.]+$/, 'Invalid phone format'),
  department: z.string().optional(),
  availability: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'both']).optional(),
});

export const programDetailsSchema = z.object({
  programName: z.string().min(1, 'Program name is required').max(200, 'Program name too long'),
  programType: z.string().min(1, 'Program type is required'),
  description: z.string().max(1000, 'Description too long').optional(),
  lastServiceDate: z.date({ required_error: 'Last service date is required' }),
  closureDate: z.date({ required_error: 'Closure date is required' }),
  staffCount: z.number().min(0, 'Staff count must be 0 or greater').max(1000, 'Staff count seems too high'),
  organizationalStructure: z.string().max(500, 'Organizational structure description too long').optional(),
  complianceRequirements: z.array(z.string()).optional(),
}).refine(data => data.closureDate >= data.lastServiceDate, {
  message: 'Closure date must be on or after last service date',
  path: ['closureDate'],
});

export const locationDetailsSchema = z.object({
  building: z.string().min(1, 'Building is required').max(100, 'Building name too long'),
  floor: z.string().max(20, 'Floor designation too long').optional(),
  roomNumbers: z.array(z.string()).min(1, 'At least one room number is required'),
  address: z.string().min(1, 'Address is required').max(300, 'Address too long'),
  accessRestrictions: z.string().max(500, 'Access restrictions description too long').optional(),
  securityRequirements: z.string().max(500, 'Security requirements description too long').optional(),
  keyReturnRequired: z.boolean(),
  keyReturnDate: z.date().optional(),
});

export const assetItemSchema = z.object({
  id: z.string(),
  type: z.string().min(1, 'Asset type is required'),
  description: z.string().min(1, 'Description is required').max(300, 'Description too long'),
  quantity: z.number().min(1, 'Quantity must be at least 1').max(1000, 'Quantity seems too high'),
  assetTag: z.string().max(50, 'Asset tag too long').optional(),
  serialNumber: z.string().max(100, 'Serial number too long').optional(),
  condition: z.enum(['excellent', 'good', 'fair', 'poor', 'non-functional']),
  location: z.string().min(1, 'Location is required').max(100, 'Location too long'),
  disposition: z.enum(['transfer', 'surplus', 'dispose', 'return', 'storage']),
  specialInstructions: z.string().max(500, 'Special instructions too long').optional(),
  estimatedValue: z.number().min(0, 'Value must be 0 or greater').optional(),
});

export const itEquipmentSchema = assetItemSchema.extend({
  type: z.enum(['desktop', 'laptop', 'monitor', 'printer', 'phone', 'network-device', 'server', 'other-it']),
  networkConnected: z.boolean(),
  dataWipeRequired: z.boolean(),
  manufacturer: z.string().max(50, 'Manufacturer name too long').optional(),
  model: z.string().max(100, 'Model name too long').optional(),
});

export const furnitureSchema = assetItemSchema.extend({
  type: z.enum(['desk', 'chair', 'table', 'cabinet', 'shelving', 'other-furniture']),
  dimensions: z.string().max(50, 'Dimensions too long').optional(),
  material: z.string().max(50, 'Material description too long').optional(),
  disassemblyRequired: z.boolean(),
});

export const digitalAssetSchema = z.object({
  id: z.string(),
  type: z.enum(['user-account', 'shared-drive', 'database', 'application', 'email-group', 'other']),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(300, 'Description too long').optional(),
  owner: z.string().min(1, 'Owner is required').max(100, 'Owner name too long'),
  backupRequired: z.boolean(),
  retentionPeriod: z.string().max(50, 'Retention period too long').optional(),
  accessPermissions: z.array(z.string()),
  deactivationDate: z.date().optional(),
  archivalRequired: z.boolean(),
  complianceNotes: z.string().max(500, 'Compliance notes too long').optional(),
});

export const userAccountSchema = digitalAssetSchema.extend({
  type: z.literal('user-account'),
  email: z.string().email('Valid email is required'),
  employeeName: z.string().min(1, 'Employee name is required').max(100, 'Employee name too long'),
  department: z.string().min(1, 'Department is required').max(100, 'Department name too long'),
  lastLoginDate: z.date().optional(),
  forwardingEmail: z.string().email('Valid forwarding email required').optional(),
  mailboxSize: z.number().min(0, 'Mailbox size must be 0 or greater').optional(),
  sharedMailboxAccess: z.array(z.string()).optional(),
});

export const networkingRequirementsSchema = z.object({
  wifiAccessPoints: z.number().min(0, 'WiFi access points must be 0 or greater'),
  networkPrinters: z.number().min(0, 'Network printers must be 0 or greater'),
  sharedDrives: z.array(z.string()),
  networkDrops: z.number().min(0, 'Network drops must be 0 or greater'),
  phoneLines: z.number().min(0, 'Phone lines must be 0 or greater'),
  internetCircuits: z.array(z.string()),
  vpnAccess: z.array(z.string()),
  specialNetworkNeeds: z.string().max(500, 'Special network needs description too long').optional(),
  firewallRules: z.array(z.string()).optional(),
});

export const logisticsRequirementsSchema = z.object({
  packingRequired: z.boolean(),
  labelingInstructions: z.string().max(500, 'Labeling instructions too long').optional(),
  elevatorRequired: z.boolean(),
  loadingDockAccess: z.boolean(),
  truckAccessRequired: z.boolean(),
  storageNeeded: z.boolean(),
  specialHandling: z.string().max(500, 'Special handling description too long').optional(),
  hazardousMaterials: z.string().max(300, 'Hazardous materials description too long').optional(),
  insuranceRequired: z.boolean(),
  transportationNeeds: z.string().max(500, 'Transportation needs too long').optional(),
});

export const timelineSchema = z.object({
  equipmentPickupDate: z.date().optional(),
  furniturePickupDate: z.date().optional(),
  digitalAssetDeactivationDate: z.date().optional(),
  finalVacateDate: z.date({ required_error: 'Final vacate date is required' }),
  keyReturnDate: z.date().optional(),
  auditDate: z.date().optional(),
  documentationDueDate: z.date().optional(),
  coordinationMeetingDate: z.date().optional(),
});

export const programClosureSchema = z.object({
  id: z.string(),
  status: z.enum(['draft', 'submitted', 'in-progress', 'completed', 'cancelled']),
  
  programDetails: programDetailsSchema,
  primaryContact: contactInfoSchema,
  alternateContact: contactInfoSchema.optional(),
  location: locationDetailsSchema,
  
  itEquipment: z.array(itEquipmentSchema),
  furniture: z.array(furnitureSchema),
  digitalAssets: z.array(digitalAssetSchema),
  userAccounts: z.array(userAccountSchema),
  
  networkingRequirements: networkingRequirementsSchema,
  logisticsRequirements: logisticsRequirementsSchema,
  timeline: timelineSchema,
  
  qualityChecks: z.object({
    informationComplete: z.boolean(),
    contactsVerified: z.boolean(),
    assetsInventoried: z.boolean(),
    timelineConfirmed: z.boolean(),
    stakeholdersNotified: z.boolean(),
    complianceReviewed: z.boolean(),
    risksAssessed: z.boolean(),
  }),
  
  stakeholderCommunication: z.object({
    itOperationsNotified: z.boolean(),
    adminOperationsNotified: z.boolean(),
    securityNotified: z.boolean(),
    facilitiesNotified: z.boolean(),
    hrNotified: z.boolean(),
    financeNotified: z.boolean(),
    customStakeholders: z.array(z.string()).optional(),
  }),
  
  additionalNotes: z.string().max(2000, 'Additional notes too long').optional(),
  specialRequirements: z.string().max(1000, 'Special requirements too long').optional(),
  riskAssessment: z.string().max(1000, 'Risk assessment too long').optional(),
  budgetConsiderations: z.string().max(1000, 'Budget considerations too long').optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string().min(1, 'Created by is required'),
  lastModifiedBy: z.string().min(1, 'Last modified by is required'),
  
  submittedAt: z.date().optional(),
  completedAt: z.date().optional(),
  
  auditTrail: z.array(z.object({
    id: z.string(),
    timestamp: z.date(),
    action: z.enum(['created', 'updated', 'submitted', 'reviewed', 'approved', 'completed', 'cancelled']),
    user: z.string(),
    changes: z.record(z.object({
      from: z.unknown(),
      to: z.unknown(),
    })).optional(),
    notes: z.string().optional(),
  })),
});

export type ProgramClosureFormData = z.infer<typeof programClosureSchema>;