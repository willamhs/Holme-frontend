import { ResourceType, ResourceCategory } from './resource-create-update-request.model';

export interface Resource {
  id: number;
  title: string;
  url: string;
  type: ResourceType;
  filePath: string;
  category: ResourceCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
}
