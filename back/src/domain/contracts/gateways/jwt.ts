type Profile = {
  profile: {
    id: string;
    nm_profile: string;
    key_module: string;
  };
  organization: { id: string; nm_organization: string };
};

export type Payload = {
  id: string;
  email: string;
  nm_user: string;
  url_thumb?: string;
  profiles: Array<Profile>;
  iat: number;
  exp: number;
};
