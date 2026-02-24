export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}
