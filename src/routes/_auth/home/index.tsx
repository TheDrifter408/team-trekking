import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/routes/_auth/home/-components/page-header';
import { useState } from 'react';
import { useWorkspaceDashBoardRecentQuery } from '@/service/rtkQueries/workspaceQuery';
import { HARD_CARD_LIST, HOME_CARD_TITLE } from '@/lib/constants';
import { RecentContent } from './-components/recent-content';
import { MyWorkContent } from './-components/my-work-content';
import { AssignedCommentsContent } from './-components/assigned-comments-content';
import { TutorialDialog } from '@/components/features/tutotial-dialog';
import { ShareSpaceDialog } from '@/components/common/share-space-dialog';
import { getWelcomeMessage } from '@/lib/utils/utils';
import { Space } from '@/types/request-response/workspace/ApiResponse';

enum Direction {
  NEXT = 'next',
  PREV = 'prev',
}

const Overview = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [cardsList, setCardsList] = useState(HARD_CARD_LIST);
  const isCardExpanded = expandedCardId !== null;
  const [sharingSpaceDialogOpen, setSharingSpaceDialogOpen] = useState(false);
  const { data: workspaceRecent } = useWorkspaceDashBoardRecentQuery();
  const onCancelFullView = () => {
    setExpandedCardId(null);
  };

  const onExpandToFullView = (cardTitle: string) => {
    setExpandedCardId(cardTitle);
  };

  const navigateCard = (direction: Direction.NEXT | Direction.PREV) => {
    if (!expandedCardId) return;

    const currentIndex = cardsList.findIndex(
      (card) => card.id === expandedCardId
    );
    const increment = direction === Direction.NEXT ? 1 : -1;
    const nextIndex =
      (currentIndex + increment + cardsList.length) % cardsList.length;
    setExpandedCardId(cardsList[nextIndex].id);
  };

  const onNextCard = () => navigateCard(Direction.NEXT);
  const onPrevCard = () => navigateCard(Direction.PREV);

  const isCardAdded = (cardId: string) => {
    return cardsList.find((card) => card.id === cardId)?.isAdded ?? false;
  };

  const onToggleCardVisibility = (cardId: string) => {
    setCardsList((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isAdded: !card.isAdded } : card
      )
    );
  };
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader
        title={expandedCardId || ''}
        onCancelFullView={onCancelFullView}
        state={isCardExpanded}
        onNextCard={onNextCard}
        onPrevCard={onPrevCard}
        cardsList={cardsList}
        onToggleCardVisibility={onToggleCardVisibility}
      />

      <div className="flex-1 overflow-y-auto px-[25px] py-[10px]">
        {!isCardExpanded && (
          <>
            <span className="text-3xl font-semibold ml-3">
              {getWelcomeMessage()}
            </span>
            <div className="grid grid-cols-1 gap-4 my-2 xl:grid-cols-2">
              {isCardAdded(HOME_CARD_TITLE.RECENTS) && (
                <RecentContent
                  data={workspaceRecent ?? []}
                  isExpanded={false}
                  onExpand={onExpandToFullView}
                  cardTitle={HOME_CARD_TITLE.RECENTS}
                />
              )}
              {isCardAdded(HOME_CARD_TITLE.MY_WORK) && (
                <MyWorkContent
                  expanded={false}
                  onExpand={onExpandToFullView}
                  cardTitle={HOME_CARD_TITLE.MY_WORK}
                />
              )}
              {isCardAdded(HOME_CARD_TITLE.ASSIGNED_COMMENTS) && (
                <AssignedCommentsContent
                  expanded={false}
                  onExpand={onExpandToFullView}
                  cardTitle={HOME_CARD_TITLE.ASSIGNED_COMMENTS}
                />
              )}
            </div>
          </>
        )}
      </div>

      {isCardExpanded && (
        <div className="flex-1 flex w-full">
          {expandedCardId === HOME_CARD_TITLE.RECENTS &&
            isCardAdded(HOME_CARD_TITLE.RECENTS) && (
              <RecentContent
                data={workspaceRecent ?? []}
                isExpanded={true}
                onExpand={onExpandToFullView}
                cardTitle={HOME_CARD_TITLE.RECENTS}
              />
            )}
          {expandedCardId === HOME_CARD_TITLE.MY_WORK &&
            isCardAdded(HOME_CARD_TITLE.MY_WORK) && (
              <MyWorkContent
                expanded={true}
                onExpand={onExpandToFullView}
                cardTitle={HOME_CARD_TITLE.MY_WORK}
              />
            )}
          {expandedCardId === HOME_CARD_TITLE.ASSIGNED_COMMENTS &&
            isCardAdded(HOME_CARD_TITLE.ASSIGNED_COMMENTS) && (
              <AssignedCommentsContent
                expanded={true}
                onExpand={onExpandToFullView}
                cardTitle={HOME_CARD_TITLE.ASSIGNED_COMMENTS}
              />
            )}
        </div>
      )}
      <TutorialDialog />
      <ShareSpaceDialog
        isOpen={sharingSpaceDialogOpen}
        setIsOpen={(open) => setSharingSpaceDialogOpen(!open)}
        space={{} as Space}
      />
    </div>
  );
};

export const Route = createFileRoute('/_auth/home/')({
  component: Overview,
});
