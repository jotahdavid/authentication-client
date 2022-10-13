import { Link } from 'react-router-dom';

import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Form } from '@components/Form';

import defaultAvatarIcon from '@assets/images/user-circle.png';

export function ProfileSettings() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-blue-100 font-poppins">
      <Form.Root className="pt-[58px] sm:pt-[78px] relative">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
        >
          <Avatar src={defaultAvatarIcon} size="lg" />
        </div>

        <Form.Field
          label="Name"
          placeholder="Your name"
          leftIcon={<i className="fa-solid fa-user" />}
        />

        <Form.Field
          label="Email"
          placeholder="Your email"
          inputType="email"
          leftIcon={<i className="fa-solid fa-envelope" />}
        />

        <Form.Field
          disabled
          label="Password"
          placeholder="••••••••"
          inputType="password"
          leftIcon={<i className="fa-solid fa-lock" />}
        >
          <div className="w-full flex justify-end mt-1">
            <Link
              to="/profile/password"
              className="
                text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors
              "
            >
              Change password&nbsp;
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </Link>
          </div>
        </Form.Field>

        <Button className="mt-2">
          Update
        </Button>
      </Form.Root>
    </main>
  );
}
