export interface AppProject {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  defaultGithubUrl: string;
  githubRepoUrl: string;
  iconName: string; // lucide icon identifier
  iconBgColor: string; // Tailwind class
  iconTextColor: string; // Tailwind class
  techStack: string[];
  features: string[];
  // Miniature simulated content inside iOS
  simulatedData: {
    title: string;
    items: {
      id: string;
      title: string;
      desc: string;
      extra?: string;
      image?: string;
      price?: string;
      rating?: string;
    }[];
  };
}

export interface SystemPreferences {
  themeMode: 'light' | 'dark';
  brightness: number; // 0 to 100
  soundEnabled: boolean;
  wallpaperUrl: string;
}
