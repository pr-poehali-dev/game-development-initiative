import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Choice {
  text: string;
  affectionChange: number;
}

interface DialogueNode {
  id: number;
  character: string;
  text: string;
  choices?: Choice[];
}

const Index = () => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [affection, setAffection] = useState(50);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  const dialogues: DialogueNode[] = [
    {
      id: 0,
      character: 'Юки',
      text: 'Привет... Я так долго ждала, когда ты придёшь. Ты ведь думал обо мне, правда?',
      choices: [
        { text: 'Конечно, ты всегда в моих мыслях', affectionChange: 15 },
        { text: 'Я... немного думал', affectionChange: 5 },
        { text: 'Извини, я был занят', affectionChange: -10 }
      ]
    },
    {
      id: 1,
      character: 'Юки',
      text: 'Знаешь... я заметила, что ты сегодня разговаривал с той девушкой. Она ведь ничего для тебя не значит, правда?',
      choices: [
        { text: 'Только ты важна для меня', affectionChange: 20 },
        { text: 'Мы просто друзья', affectionChange: 0 },
        { text: 'Это не твоё дело', affectionChange: -20 }
      ]
    },
    {
      id: 2,
      character: 'Юки',
      text: 'Я так рада это слышать... Ты ведь останешься со мной навсегда? Мы будем вместе. Только мы двое.',
      choices: [
        { text: 'Навсегда вместе', affectionChange: 25 },
        { text: 'Мне нужно подумать', affectionChange: -15 }
      ]
    }
  ];

  const dialogue = dialogues[currentDialogue];

  useEffect(() => {
    setDisplayedText('');
    setIsTextComplete(false);
    setShowChoices(false);
    
    let index = 0;
    const text = dialogue.text;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTextComplete(true);
        setShowChoices(true);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentDialogue, dialogue.text]);

  const handleChoice = (choice: Choice) => {
    const newAffection = Math.max(0, Math.min(100, affection + choice.affectionChange));
    setAffection(newAffection);
    
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    }
  };

  const getAffectionColor = () => {
    if (affection >= 70) return 'bg-pink-500';
    if (affection >= 40) return 'bg-purple-500';
    return 'bg-muted';
  };

  const getAffectionLabel = () => {
    if (affection >= 80) return 'Одержимость';
    if (affection >= 60) return 'Сильная привязанность';
    if (affection >= 40) return 'Симпатия';
    if (affection >= 20) return 'Интерес';
    return 'Холодность';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 font-montserrat">
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b592a6d2-3c85-4ced-965b-432b554db654.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-cormorant font-semibold text-primary mb-2">
            Моя Единственная
          </h1>
          <p className="text-muted-foreground">Визуальная новелла</p>
        </div>

        <Card className="mb-6 p-6 bg-card/80 backdrop-blur-sm border-primary/20 animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Heart" className="text-primary" size={20} />
              <span className="font-medium">{getAffectionLabel()}</span>
            </div>
            <span className="text-sm text-muted-foreground">{affection}%</span>
          </div>
          <Progress value={affection} className="h-3">
            <div className={`h-full ${getAffectionColor()} transition-all duration-500`} style={{ width: `${affection}%` }} />
          </Progress>
        </Card>

        <Card className="mb-6 bg-card/90 backdrop-blur-md border-primary/30 animate-scale-in">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img 
              src="https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b592a6d2-3c85-4ced-965b-432b554db654.jpg" 
              alt="Юки"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-cormorant font-semibold text-primary mb-1">
                {dialogue.character}
              </h3>
            </div>
          </div>

          <div className="p-6">
            <div className="min-h-[120px] mb-6">
              <p className="text-lg font-cormorant leading-relaxed animate-text-reveal">
                {displayedText}
                {!isTextComplete && <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse"></span>}
              </p>
            </div>

            {showChoices && dialogue.choices && (
              <div className="space-y-3">
                {dialogue.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-5 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <Icon name="MessageCircle" className="mr-3 text-primary group-hover:scale-110 transition-transform" size={18} />
                    <span className="font-cormorant text-base">{choice.text}</span>
                  </Button>
                ))}
              </div>
            )}

            {!dialogue.choices && isTextComplete && (
              <div className="text-center">
                <p className="text-xl font-cormorant text-primary mb-4">
                  {affection >= 70 ? '❤️ Счастливый финал ❤️' : affection >= 40 ? '💔 Неопределённость' : '🖤 Печальный финал'}
                </p>
                <Button
                  onClick={() => {
                    setCurrentDialogue(0);
                    setAffection(50);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Icon name="RotateCcw" className="mr-2" size={18} />
                  Начать заново
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Info" size={16} />
            Твои выборы влияют на отношения с Юки
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
