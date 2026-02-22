export type SearchParamProps = {
  searchParams: Promise<{ error: string; token?: string }>;
};

export type SPProps = {
  sp: {
    [key: string]: string | string[] | undefined;
  };
};
