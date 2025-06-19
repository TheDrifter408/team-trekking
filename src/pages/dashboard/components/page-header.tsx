import { FC } from 'react';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/shadcn-ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn-ui/sheet';
import {
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconX,
  IconCheck,
  IconCirclePlus,
} from '@tabler/icons-react';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { LABEL } from '@/lib/constants/appStrings.ts';

interface CardItem {
  id: string;
  description: string;
  isAdded: boolean;
  imageSource: string;
}

interface PageHeaderProps {
  state: boolean;
  onCancelFullView: () => void;
  title?: string;
  onNextCard: () => void;
  onPrevCard: () => void;
  cardsList: CardItem[];
  onToggleCardVisibility: (cardId: string) => void;
}

export const PageHeader: FC<PageHeaderProps> = ({
  state,
  onCancelFullView,
  title = '',
  onNextCard,
  onPrevCard,
  cardsList,
  onToggleCardVisibility,
}) =>
  state ? (
    <FullViewHeader
      title={title}
      onCancel={onCancelFullView}
      onNextCard={onNextCard}
      onPrevCard={onPrevCard}
    />
  ) : (
    <DefaultHeader
      cardsList={cardsList}
      onToggleCardVisibility={onToggleCardVisibility}
    />
  );

const CardToggleButton: FC<{ card: CardItem; onClick: () => void }> = ({
  card,
  onClick,
}) => (
  <Button
    size="sm"
    className={cn(
      'px-5 font-medium text-sm transition-colors flex items-center gap-2',
      card.isAdded
        ? 'bg-theme-main hover:bg-theme-main-dark'
        : 'bg-muted text-primary hover:bg-muted/80'
    )}
    onClick={onClick}
  >
    {card.isAdded ? <IconCheck size={16} /> : <IconCirclePlus size={16} />}
    <span>{card.isAdded ? LABEL.ADDED : LABEL.ADD_TO_OVERVIEW}</span>
  </Button>
);

const CardItem: FC<{ card: CardItem; onToggle: (id: string) => void }> = ({
  card,
  onToggle,
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <img
          src={card.imageSource}
          alt={card.id}
          className="w-12 h-12 object-contain"
        />
        <CardToggleButton card={card} onClick={() => onToggle(card.id)} />
      </div>
      <div className="mt-4">
        <p className="text-xl font-semibold">{card.id}</p>
        <p className="text-sm text-muted-foreground">{card.description}</p>
      </div>
    </CardContent>
  </Card>
);

const DefaultHeader: FC<{
  cardsList: CardItem[];
  onToggleCardVisibility: (cardId: string) => void;
}> = ({ cardsList, onToggleCardVisibility }) => (
  <div
    className={cn(
      'sticky flex items-center justify-between top-0 bg-background z-10 w-full',
      'border-l border-r border-b px-3 rounded-sm h-[50px]'
    )}
  >
    <div className="flex text-base items-center gap-4 py-[13px]">
      <IconHome size={16} />
      <span>{LABEL.HOME}</span>
    </div>
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="bg-theme-main-dark text-base text-white hover:bg-theme-main-dark/90"
        >
          {LABEL.MANAGE_CARDS}
        </Button>
      </SheetTrigger>
      <SheetContent
        overlay={false}
        side="right"
        className="w-[300px] top-[46px] overflow-y-scroll h-[calc(100%-46px)] sm:w-[400px]"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background border-b h-[48px] px-4">
          <div className="relative flex items-center justify-between h-full">
            <SheetTitle className="text-2xl font-semibold">
              {LABEL.ADD_CARDS}
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
          {cardsList.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onToggle={onToggleCardVisibility}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  </div>
);

const FullViewHeader: FC<{
  title: string;
  onCancel: () => void;
  onNextCard: () => void;
  onPrevCard: () => void;
}> = ({ title, onCancel, onNextCard, onPrevCard }) => (
  <div
    className={cn(
      'sticky top-0 bg-background z-10 w-full',
      'border-l border-r'
    )}
  >
    <div className="pl-3 border-b pr-4 flex text-base items-center justify-between gap-4 h-[50px]">
      <div className="flex items-center">
        <Button onClick={onPrevCard} variant="ghost" size="icon_sm">
          <IconChevronLeft />
        </Button>
        <Button onClick={onNextCard} variant="ghost" size="icon_sm">
          <IconChevronRight />
        </Button>
        <Button
          variant={'ghost'}
          className={'font-normal text-base'}
          onClick={onCancel}
        >
          {LABEL.HOME}
        </Button>
        /&nbsp;&nbsp;
        <span className="text-muted-foreground">{title}</span>
      </div>
      <Button onClick={onCancel} variant="ghost" size="icon">
        <IconX />
      </Button>
    </div>
  </div>
);
