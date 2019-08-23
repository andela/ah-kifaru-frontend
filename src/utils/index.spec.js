import { calculateReadTime } from '@utils';

const content =
  'If you own a business in Lagos, or are trying to set one up, the chances are that someone has already told you that you are mad. I am here to confirm what you were told: yes you are mad. You are either currently mad, or will be in the future. This is what running a business in Lagos does to you Surely there has to be a better way? Yes! You could postpone your Estimated Touch Day (ETD — the day your head finally touches and you go coocoo), or reduce the effects of an already messed up mental condition. Either way, your family needs you, so it’s important to learn how to stay sane in Lagos, while building your business. This is the king of all business advices — but especially in Lagos. Credit is super expensive, so it’s very important to maintain some liquidity for the sake of your sanity. Put away a part of your receivables to form a rainy day fund for the business. Your rainy day fund should be about the amount needed to fund one or two payroll cycles.Not the government, not the tax man, not the auditor, not the client. The guys listed are only the official ones — your success or failures might depend on ensuring some people who have never been mentioned in a business book are happy. Think of all these guys whenever you’re running your numbers. That’s how you ensure none of them stiffs you. Actually, you’ll only manage damage limitation, because they will stiff you. In my last job, I used to oversee imports and distribution, and every time our containers came in, we had to pay off police, area boys, guys on the street, local chiefs etc. Every Christmas, the chief of the area boys would come over, sit with my boss for drinks, while we put together a Christmas package for him.';

describe('it should test calculate read time helper function', () => {
  it('it should return read time for a content when the word is greater than 200wordPerMinute', () => {
    expect(calculateReadTime(content)).toEqual('~2 min read');
  });

  it('it should return less than a minute when content is less than 200wordPerMinute', () => {
    const lessWord =
      'If you own a business in Lagos, or are trying to set one up.';
    expect(calculateReadTime(lessWord)).toEqual('less than a min read');
  });
});
