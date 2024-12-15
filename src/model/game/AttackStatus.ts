import Coordinate from 'Model/game/Coordinate';

interface AttackStatus {
  hit: boolean;
  sink: boolean;
  coordinate: Coordinate;
}

export default AttackStatus;
