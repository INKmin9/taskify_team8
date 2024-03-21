'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { GetCardListParams } from '@apis/cards/getCardList';
import { cardsQueryOptions } from '@queries/keys/cardsKeys';

export const useGetCardListOnInfiniteScroll = ({ columnId, size = 5 }: GetCardListParams) => {
  return useInfiniteQuery({
    ...cardsQueryOptions.infiniteCardList({ columnId, size }),
    // TODO: lastPage가 처음에 enabled false여서 없을 수도 있음.
    // * 에러 발생 예상 지역
    initialPageParam: 1,
    // TODO: 수정중
    getNextPageParam: (lastPage, allPages, _pageParam, _allPageParams) => {
      console.log(lastPage);

      if (allPages.length && lastPage.cursorId) {
        // if (lastPage.cursorId) {
        return lastPage.cursorId;
      }

      return null;
    },
    select: (data) => {
      console.log('--------------- data ---------------');
      console.log(data);

      console.log('--------------- data.pages ---------------');
      console.log(data.pages);

      console.log('--------------- data.pageParams) ---------------');
      console.log(data.pageParams);

      // cards: Array(4)
      // cursorId: null
      // totalCount: 4

      return {
        pages: data?.pages?.map((page) => {
          return page?.cards;
        }),
        pageParams: data?.pageParams,
      };
    },
    // enabled: false,
    enabled: !!columnId,
  });
};