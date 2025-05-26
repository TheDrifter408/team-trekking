import { FC } from 'react';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconX,
} from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card.tsx';

interface Props {
  state: boolean;
  onCancelFullView: () => void;
  title?: string;
  onNextCard: () => void;
  onPrevCard: () => void;
  cardsList: any;
}

export const PageHeader: FC<Props> = ({
  state,
  onCancelFullView,
  title = '',
  onNextCard,
  onPrevCard,
  cardsList,
}) =>
  state ? (
    <FullViewPageHeader
      onNextCard={onNextCard}
      onPrevCard={onPrevCard}
      title={title}
      onCancel={onCancelFullView}
    />
  ) : (
    <DefaultPageHeader cardsList={cardsList} />
  );

interface DefaultPageHeaderProps {
  cardsList: any;
}
const DefaultPageHeader: FC<DefaultPageHeaderProps> = ({ cardsList }) => (
  <div
    className={cn(
      'sticky flex items-center justify-between top-0 bg-background z-10 w-full',
      'border-l border-r border-b px-3 rounded-sm'
    )}
  >
    <div className="flex text-base items-center gap-4 py-[13px]">
      <IconHome size={16} /> Home
    </div>

    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={'default'}
          className={'bg-theme-main-dark text-base text-white'}
        >
          Manage cards
        </Button>
      </SheetTrigger>
      <SheetContent
        overlay={false}
        side="right"
        className="w-[300px] top-[40px] overflow-y-scroll h-[calc(100%-40px)] sm:w-[400px]"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background border-b h-[48px] px-4">
          <div className="relative flex items-center justify-between h-full">
            <SheetTitle className="text-2xl font-semibold">
              Add Cards
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <IconX size={18} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="px-4 pb-4 space-y-4">
          {cardsList.length > 0 &&
            cardsList.map((card: any) => (
              <Card key={card.id}>
                <CardContent>
                  <div className="w-full flex justify-between">
                    <img src={card.imageSource} alt={card.id} />
                    <Button
                      size={'sm'}
                      className={'bg-theme-main px-5 font-semibold text-sm'}
                    >
                      {card.isAdded ? 'Added' : 'Add'}
                    </Button>
                  </div>
                  <div className="mt-4">
                    <p className={'text-xl font-semibold'}>{card.id}</p>
                    <p className={'text-sm text-muted-foreground'}>
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  </div>
);

interface FullViewPageHeaderProps {
  title?: string;
  onCancel: () => void;
  onNextCard: () => void;
  onPrevCard: () => void;
}

const FullViewPageHeader: FC<FullViewPageHeaderProps> = ({
  title = '',
  onCancel,
  onNextCard,
  onPrevCard,
}) => (
  <div
    className={cn(
      'sticky top-0 bg-background z-10 w-full',
      'border-l border-r'
    )}
  >
    <div className="pl-3 border-b pr-4 flex text-base items-center justify-between gap-4 h-[47px]">
      <div className="flex items-center">
        <Button onClick={onPrevCard} variant={'ghost'} size={'icon_sm'}>
          <IconChevronLeft />
        </Button>
        <Button onClick={onNextCard} variant={'ghost'} size={'icon_sm'}>
          <IconChevronRight />
        </Button>
        <span>Home&nbsp;&nbsp;</span>
        <span className="text-muted-foreground">{'/'}&nbsp;&nbsp;</span>
        <span className="text-muted-foreground">{title}</span>
      </div>
      <div className="!mr-0">
        <Button onClick={onCancel} variant={'ghost'} size={'icon'}>
          <IconX />
        </Button>
      </div>
    </div>
  </div>
);
