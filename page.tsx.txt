const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = (priceId: string, plan: string) => {
    const paymentLinks = {
      'Pro': 'https://buy.stripe.com/4gM3cuapB6tYapG6Sn1VK04',
      'Business': 'https://buy.stripe.com/aFa5kCapBbOifK090v1VK05'
    };

    const link = paymentLinks[plan as keyof typeof paymentLinks];
    
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Payment link not found');
    }
  };

  return { createCheckoutSession, loading };
};