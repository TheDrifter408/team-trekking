'use client';

import { useState } from 'react';
import { PageHeader } from './components/page-header';
import { RecentContent } from '@/pages/dashboard/components/recent-content.tsx';
import { MyWorkContent } from '@/pages/dashboard/components/my-work-content.tsx';
import { AssignedCommentsContent } from '@/pages/dashboard/components/assigned-comments-content.tsx';
import { TutorialDialog } from '@/components/features/tutotial-dialog.tsx';
import {
  HARD_CARD_LIST,
  HOME_CARD_TITLE,
} from '@/lib/constants/appConstant.ts';
import { getWelcomeMessage } from '@/lib/utils.ts';

enum Direction {
  NEXT = 'next',
  PREV = 'prev',
}

const Dashboard = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [cardsList, setCardsList] = useState(HARD_CARD_LIST);

  const isCardExpanded = expandedCardId !== null;

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
            <div className="grid grid-cols-1 gap-4 my-2 md:grid-cols-2">
              {isCardAdded(HOME_CARD_TITLE.RECENTS) && (
                <RecentContent
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
        <div className="fixed">
          {expandedCardId === HOME_CARD_TITLE.RECENTS &&
            isCardAdded(HOME_CARD_TITLE.RECENTS) && (
              <RecentContent
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
    </div>
  );
};
export default Dashboard;
