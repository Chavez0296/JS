let quotes = [
    `The way to get started is to quit talking and begin doing." -Walt Disney`,
    `"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking." -Steve Jobs`,
    `"If life were predictable it would cease to be life, and be without flavor." -Eleanor Roosevelt`,
    `"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough." -Oprah Winfrey`,
    `"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success." -James Cameron`,
    `"Life is what happens when you're busy making other plans." -John Lennon`,
    `"Spread love everywhere you go. Let no one ever come to you without leaving happier." -Mother Teresa`,
    `"Always remember that you are absolutely unique. Just like everyone else." -Margaret Mead`,
    `"Don't judge each day by the harvest you reap but by the seeds that you plant." -Robert Louis Stevenson`,
    `"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart." -Helen Keller`,
    `"You will face many defeats in life, but never let yourself be defeated." -Maya Angelou`,
    `"Never let the fear of striking out keep you from playing the game." -Babe Ruth`,
    `"You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose." -Dr. Seuss`,
    `"The purpose of our lives is to be happy." -Dalai Lama`, 
    `"You only live once, but if you do it right, once is enough." -Mae West`,
    `"Go confidently in the direction of your dreams! Live the life you've imagined." -Henry David Thoreau`,
    `"Life is really simple, but we insist on making it complicated." -Confucius`,
    `"Love the life you live. Live the life you love." -Bob Marley`,
    `"The secret of success is to do the common thing uncommonly well." -John D. Rockefeller Jr.`,
    `"The real test is not whether you avoid this failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you learn from it; whether you choose to persevere." -Barack Obama`,
    `"I find that the harder I work, the more luck I seem to have." -Thomas Jefferson`
  ];
  
  // Generates a random integer between a range of numbers (inclusive)
  function generateRandomInt(from, to) {
     return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  
  function generateRandomQuote() {
    let randomIndex = generateRandomInt(0, quotes.length - 1)
    return quotes[randomIndex];
  }
  
  module.exports.getQuote = generateRandomQuote;