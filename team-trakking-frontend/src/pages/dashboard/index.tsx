'use client';

import { useState } from 'react';
import { WELCOME_MESSAGE } from '@/lib/constants';
import { HOME_CARD_TITLE, HomeCardList } from '@/lib/constants';
import { PageHeader } from './components/page-header';
import { RecentContent } from '@/pages/dashboard/components/recent-content.tsx';
import { MyWorkContent } from '@/pages/dashboard/components/my-work-content.tsx';
import { AssignedCommentsContent } from '@/pages/dashboard/components/assigned-comments-content.tsx';

export const Dashboard = () => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [expandedCard, setExpandedCard] = useState({
    recentCard: false,
    myWorkCard: false,
    assignedCommentsCard: false,
  });

  const onCancelFullView = () => {
    setIsCardExpanded(false);
    setTitle('');
    setExpandedCard({
      recentCard: false,
      myWorkCard: false,
      assignedCommentsCard: false,
    });
  };

  const onExpandToFullView = (cardTitle: string) => {
    setIsCardExpanded(true);
    setTitle(cardTitle);
    setExpandedCard({
      recentCard: cardTitle === HOME_CARD_TITLE.RECENTS,
      myWorkCard: cardTitle === HOME_CARD_TITLE.MY_WORK,
      assignedCommentsCard: cardTitle === HOME_CARD_TITLE.ASSIGNED_COMMENTS,
    });
  };

  const onNextCard = () => {
    const currentCardId = expandedCard.recentCard
      ? HOME_CARD_TITLE.RECENTS
      : expandedCard.myWorkCard
        ? HOME_CARD_TITLE.MY_WORK
        : expandedCard.assignedCommentsCard
          ? HOME_CARD_TITLE.ASSIGNED_COMMENTS
          : '';

    const currentIndex = HomeCardList.findIndex(
      (card) => card.id === currentCardId
    );
    const nextIndex = (currentIndex + 1) % HomeCardList.length;
    const nextCardTitle = HomeCardList[nextIndex].id;
    onExpandToFullView(nextCardTitle);
  };

  const onPrevCard = () => {
    const currentCardId = expandedCard.recentCard
      ? HOME_CARD_TITLE.RECENTS
      : expandedCard.myWorkCard
        ? HOME_CARD_TITLE.MY_WORK
        : expandedCard.assignedCommentsCard
          ? HOME_CARD_TITLE.ASSIGNED_COMMENTS
          : '';

    const currentIndex = HomeCardList.findIndex(
      (card) => card.id === currentCardId
    );
    const prevIndex =
      (currentIndex - 1 + HomeCardList.length) % HomeCardList.length;
    const prevCardTitle = HomeCardList[prevIndex].id;
    onExpandToFullView(prevCardTitle);
  };

  return (
    <div>
      <PageHeader
        title={title}
        onCancelFullView={onCancelFullView}
        state={isCardExpanded}
        onNextCard={onNextCard}
        onPrevCard={onPrevCard}
        cardsList={HomeCardList}
      />
      <div className="px-[25px] py-[10px]">
        {!isCardExpanded && (
          <>
            <span className="text-3xl font-semibold ml-3">
              {WELCOME_MESSAGE}
            </span>
            <div className="grid grid-cols-2 gap-4 my-2">
              <RecentContent
                expanded={expandedCard.recentCard}
                onExpand={onExpandToFullView}
                cardTitle={HOME_CARD_TITLE.RECENTS}
              />
              <MyWorkContent
                expanded={expandedCard.myWorkCard}
                onExpand={onExpandToFullView}
                cardTitle={HOME_CARD_TITLE.MY_WORK}
              />
              <AssignedCommentsContent
                expanded={expandedCard.assignedCommentsCard}
                onExpand={onExpandToFullView}
                cardTitle={HOME_CARD_TITLE.ASSIGNED_COMMENTS}
              />
            </div>
          </>
        )}
      </div>
      {isCardExpanded && (
        <div className="fixed">
          {expandedCard.recentCard && (
            <RecentContent
              expanded={expandedCard.recentCard}
              onExpand={onExpandToFullView}
              cardTitle={HOME_CARD_TITLE.RECENTS}
            />
          )}
          {expandedCard.myWorkCard && (
            <MyWorkContent
              expanded={expandedCard.myWorkCard}
              onExpand={onExpandToFullView}
              cardTitle={HOME_CARD_TITLE.MY_WORK}
            />
          )}
          {expandedCard.assignedCommentsCard && (
            <AssignedCommentsContent
              expanded={expandedCard.assignedCommentsCard}
              onExpand={onExpandToFullView}
              cardTitle={HOME_CARD_TITLE.ASSIGNED_COMMENTS}
            />
          )}
        </div>
      )}
    </div>
  );
};
