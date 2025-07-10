import { Sidebar } from '@/components/shadcn-ui/sidebar';
import {
  IconBrandFigma,
  IconBrandGithub,
  IconBrandGoogleDrive,
  IconBrandYoutube,
} from '@tabler/icons-react';
import {
  CircleAlert,
  CircleCheckBig,
  Plus,
  Search,
  TriangleAlert,
} from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';

const LinkCard = ({ children }: { children: ReactNode }) => {
  return <div className="border rounded-xl p-10">{children}</div>;
};

export const TaskLinkAndRelations = ({ taskId }: { taskId?: number }) => {
  const [linkURL, setLinkURL] = useState<string>('');

  const onLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkURL(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted');
  };

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <div className="bg-slate-50 p-10 h-full">
        <div className="grid gap-7">
          <div>
            {/* Title and link form */}
            <h1 className="text-3xl font-bold pb-7">Add to this task</h1>
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Connect a URL</h2>
              <div className="">
                <form onSubmit={onSubmit}>
                  <div className="flex items-center gap-1 border border-slate-300 rounded-lg p-2">
                    <Search size={18} color="#94a3b8" />
                    <input
                      className="bg-inherit focus:outline-none focus:ring-0"
                      placeholder="Paste a link..."
                      value={linkURL}
                      onChange={onLinkChange}
                    />
                  </div>
                  {/*Icons container */}
                  <div className="flex items-end gap-2 mt-3">
                    <IconBrandGoogleDrive size={20} />
                    <IconBrandGithub size={20} />
                    <IconBrandFigma size={20} />
                    <IconBrandYoutube size={20} />
                    <span className="text-sm text-muted-foreground">
                      {'and more'}
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* For adding relationships */}
          <div>
            <h2 className="text-2xl font-bold">Add Relationship</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <LinkCard>
              <div className="flex flex-col gap-3 items-center">
                <CircleCheckBig />
                <span>Link Task</span>
              </div>
            </LinkCard>
            <LinkCard>
              <div className="flex flex-col gap-3 items-center">
                <TriangleAlert />
                <span>Waiting On</span>
              </div>
            </LinkCard>
            <LinkCard>
              <div className="flex flex-col gap-3 items-center">
                <CircleAlert />
                <span>Blocking</span>
              </div>
            </LinkCard>
            <LinkCard>
              <div className="flex flex-col gap-3 items-center">
                <Plus />
                <span>Custom</span>
              </div>
            </LinkCard>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
