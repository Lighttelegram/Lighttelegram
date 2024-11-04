// lib/storage.ts
interface ReferralData {
    referrerId: string;
  }
  
  const referralsMap = new Map<string, ReferralData[]>();
  
  export function saveReferral(userId: string, referrerId: string) {
    if (!referralsMap.has(referrerId)) {
      referralsMap.set(referrerId, []);
    }
    referralsMap.get(referrerId)?.push({ referrerId: userId });
  }
  
  export function getReferrals(userId: string) {
    const referrals = [];
    for (const [referrerId, referralData] of referralsMap.entries()) {
      if (referralData.some(data => data.referrerId === userId)) {
        referrals.push(referrerId);
      }
    }
    return referrals;
  }
  
  export function getReferrer(userId: string) {
    for (const [referrerId, referralData] of referralsMap.entries()) {
      if (referralData.some(data => data.referrerId === userId)) {
        return referrerId;
      }
    }
    return null;
  }
  