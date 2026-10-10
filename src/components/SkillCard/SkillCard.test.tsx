import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SkillCard } from './SkillCard';

describe('SkillCard Composite Component', () => {
  const defaultProps = {
    title: 'Visual Canvas Deck',
  };

  it('renders correctly with required props and default placeholder', () => {
    render(<SkillCard {...defaultProps} />);
    expect(screen.getByText('Visual Canvas Deck')).toBeInTheDocument();
    expect(screen.getByLabelText('Add bookmark')).toBeInTheDocument();
  });

  it('renders image when imageSrc is provided', () => {
    render(<SkillCard {...defaultProps} imageSrc="/preview.jpg" />);
    const img = screen.getByRole('img', { name: 'Visual Canvas Deck' });
    expect(img).toBeInTheDocument();
  });

  it('renders pill label when provided', () => {
    render(<SkillCard {...defaultProps} pillLabel="Top Rated" />);
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
  });

  it('renders in bookmarked state with remove bookmark label', () => {
    render(<SkillCard {...defaultProps} isBookmarked={true} />);
    expect(screen.getByLabelText('Remove bookmark')).toBeInTheDocument();
  });

  it('fires bookmark click handler and stops event propagation', () => {
    const handleBookmark = vi.fn();
    render(<SkillCard {...defaultProps} onBookmarkClick={handleBookmark} />);
    
    const bookmarkBtn = screen.getByLabelText('Add bookmark');
    fireEvent.click(bookmarkBtn);
    
    expect(handleBookmark).toHaveBeenCalledTimes(1);
  });

  it('renders numeric price formatted with dollar sign', () => {
    render(<SkillCard {...defaultProps} price={49} />);
    expect(screen.getByText('$49')).toBeInTheDocument();
  });

  it('renders string price formatted directly', () => {
    render(<SkillCard {...defaultProps} price="Free" />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders custom titleColor class for orange variant', () => {
    render(<SkillCard {...defaultProps} titleColor="orange" />);
    const titleEl = screen.getByText('Visual Canvas Deck');
    expect(titleEl.className).toContain('titleOrange');
  });

  it('renders custom model badges with first letter capitalized', () => {
    render(<SkillCard {...defaultProps} models={['anthropic', 'openai']} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
  });
});
