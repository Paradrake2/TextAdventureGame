export default function IntroScene({ onBegin }: { onBegin: () => void }) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to the Shadows of Eldoria</h2>
        <p>
          The world has been plunged into darkness. Monsters roam the lands, and hope is but a whisper.
          You awaken in a ruined village, clutching a rusty sword and vague memories of a world before the fall...
        </p>
        <button
          onClick={onBegin}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Begin Your Journey
        </button>
      </div>
    );
  }