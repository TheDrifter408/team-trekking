import { useState } from 'react';
import { Card, ListView, KanbanBoard } from '../../lib/main';
import {
  ChevronRight,
  Bell,
  Settings,
  Star,
  Heart,
  Share2,
  Download,
  Info,
  AlertTriangle,
} from 'lucide-react';

const CardComponentTesting = () => {
  const [clickedCard, setClickedCard] = useState('');

  const handleCardClick = (cardName: any) => {
    setClickedCard(cardName);
    setTimeout(() => setClickedCard(''), 1000);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Card Component Testing</h1>

      <div className="mb-12">
        <Card>
          <ListView />
        </Card>
      </div>
      <div className="">
        <Card>
          <KanbanBoard />
        </Card>
      </div>

      {/* Simple Cards Row */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Basic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default Card */}
          <Card>
            <Card.Header title="Default Card" subtitle="Basic configuration">
              <Bell className="text-blue-500" size={20} />
            </Card.Header>
            <Card.Content>
              <p>This is a simple card with default settings.</p>
            </Card.Content>
            <Card.Footer>
              <span className="text-sm text-gray-500">Last updated: Today</span>
              <span className="text-sm text-blue-500">View details</span>
            </Card.Footer>
          </Card>

          {/* Interactive Card */}
          <Card
            interactive
            hoverable
            onClick={() => handleCardClick('Interactive Card')}
            className={
              clickedCard === 'Interactive Card' ? 'ring-2 ring-blue-500' : ''
            }
          >
            <Card.Header title="Interactive Card" subtitle="Click me!" bordered>
              <Star className="text-yellow-500" size={20} />
            </Card.Header>
            <Card.Content>
              <p>This card is interactive. Click anywhere to activate.</p>
            </Card.Content>
            <Card.Footer bordered align="center">
              <ChevronRight size={16} />
            </Card.Footer>
          </Card>

          {/* Styled Card */}
          <Card variant="primary" shadow="lg" radius="lg" bordered>
            <Card.Header title="Styled Card" subtitle="Custom styling">
              <Settings className="text-white" size={20} />
            </Card.Header>
            <Card.Content>
              <p>This card has custom styling options applied.</p>
            </Card.Content>
            <Card.Footer align="end">
              <div className="flex space-x-2">
                <Heart
                  size={16}
                  className="cursor-pointer hover:text-red-500"
                />
                <Share2
                  size={16}
                  className="cursor-pointer hover:text-blue-500"
                />
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>

      {/* Card Sizes Row */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Card Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card cardSize="small" padding="small">
            <Card.Header title="Small Card" bordered>
              <Info size={16} className="text-blue-500" />
            </Card.Header>
            <Card.Content>
              <p className="text-sm">A compact card with small padding.</p>
            </Card.Content>
            <Card.Footer bordered align="end">
              <span className="text-xs text-blue-500">Details</span>
            </Card.Footer>
          </Card>

          <Card cardSize="medium">
            <Card.Header title="Medium Card" bordered>
              <Info size={20} className="text-blue-500" />
            </Card.Header>
            <Card.Content>
              <p>A standard sized card with default padding.</p>
            </Card.Content>
            <Card.Footer bordered>
              <span className="text-sm text-blue-500">Details</span>
            </Card.Footer>
          </Card>

          <Card cardSize="large" padding="large">
            <Card.Header title="Large Card" bordered>
              <Info size={24} className="text-blue-500" />
            </Card.Header>
            <Card.Content>
              <p className="text-lg">A larger card with spacious padding.</p>
              <p className="text-sm text-gray-500 mt-2">
                More content fits comfortably here.
              </p>
            </Card.Content>
            <Card.Footer bordered>
              <span className="text-sm text-blue-500">Details</span>
            </Card.Footer>
          </Card>
        </div>
      </div>

      {/* Card Variants Row */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="default">
            <Card.Header title="Default" />
            <Card.Content>Standard styling</Card.Content>
          </Card>

          <Card variant="primary">
            <Card.Header title="Primary" />
            <Card.Content>Primary styling</Card.Content>
          </Card>

          <Card>
            <Card.Header title="Success" />
            <Card.Content>Success styling</Card.Content>
          </Card>

          <Card>
            <Card.Header title="Danger" />
            <Card.Content>Danger styling</Card.Content>
          </Card>
        </div>
      </div>

      {/* Content Flexibility Test */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Content Flexibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card with list content */}
          <Card shadow="sm">
            <Card.Header title="Task List" />
            <Card.Content>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" checked readOnly />
                  <span className="line-through">Complete design mockup</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" checked readOnly />
                  <span className="line-through">Review feedback</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Implement component</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Write tests</span>
                </li>
              </ul>
            </Card.Content>
            <Card.Footer>
              <span className="text-sm">2/4 completed</span>
            </Card.Footer>
          </Card>

          {/* Card with complex content */}
          <Card shadow="md" hoverable>
            <Card.Header title="Data Visualization" />
            <Card.Content noPadding>
              <div className="bg-blue-50 p-4 flex justify-center">
                <div className="w-full max-w-xs">
                  <div className="flex h-40 items-end">
                    <div className="bg-blue-500 w-1/5 h-1/4 mx-1 rounded-t"></div>
                    <div className="bg-blue-500 w-1/5 h-2/4 mx-1 rounded-t"></div>
                    <div className="bg-blue-500 w-1/5 h-3/4 mx-1 rounded-t"></div>
                    <div className="bg-blue-500 w-1/5 h-full mx-1 rounded-t"></div>
                    <div className="bg-blue-500 w-1/5 h-1/2 mx-1 rounded-t"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                  </div>
                </div>
              </div>
            </Card.Content>
            <Card.Footer>
              <span className="text-sm text-gray-500">Weekly Progress</span>
              <Download size={16} className="cursor-pointer" />
            </Card.Footer>
          </Card>
        </div>
      </div>

      {/* Complex Cards Row */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Alert Card */}
          <Card bordered hoverable shadow="lg">
            <Card.Header title="System Alert" bordered>
              <AlertTriangle className="text-red-500" size={20} />
            </Card.Header>
            <Card.Content>
              <p className="font-medium">Database connection error</p>
              <p className="text-sm mt-2">
                Unable to connect to the primary database. System is operating
                in fallback mode.
              </p>
            </Card.Content>
            <Card.Footer bordered align="between">
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">
                Fix Now
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">
                Dismiss
              </button>
            </Card.Footer>
          </Card>

          {/* Profile Card */}
          <Card shadow="md" hoverable>
            <Card.Header>
              <div className="flex items-center space-x-4 w-full">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <h3 className="font-medium">John Smith</h3>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Projects</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tasks</span>
                  <span className="text-sm font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Completion</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
              </div>
            </Card.Content>
            <Card.Footer>
              <button className="w-full py-2 bg-blue-500 text-white rounded">
                View Profile
              </button>
            </Card.Footer>
          </Card>

          {/* Feature Card */}
          <Card
            interactive
            hoverable
            onClick={() => handleCardClick('Feature Card')}
            className={`bg-gradient-to-br from-purple-500 to-indigo-600 text-white ${clickedCard === 'Feature Card' ? 'ring-2 ring-white' : ''}`}
          >
            <Card.Header>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <Star className="text-white" size={20} />
              </div>
            </Card.Header>
            <Card.Content>
              <h3 className="text-xl font-bold mb-2">Premium Features</h3>
              <p className="text-white text-opacity-80">
                Unlock advanced capabilities with our premium tier.
              </p>
            </Card.Content>
            <Card.Footer align="end">
              <button className="px-4 py-2 bg-white text-indigo-600 rounded font-medium">
                Upgrade Now
              </button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardComponentTesting;
