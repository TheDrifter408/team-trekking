import { Icon } from '@/assets/icon-path.tsx';
import { Button } from '@/components/shadcn-ui/button.tsx';

export const OptionsColumn = () => {
  return (
    <>
      <Button className={'w-full h-full'} variant="ghost">
        <Icon name="menu03" />
      </Button>
    </>
  );
};
