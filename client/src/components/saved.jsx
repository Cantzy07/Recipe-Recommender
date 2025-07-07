import { useState, useMemo } from "react"
import { Search, ChevronDown, ExternalLink } from "lucide-react"
import "./search.css"

function SearchCard({ card, isExpanded, onToggle }) {
  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  return (
    <div className="search-card">
      <div className="card-header" onClick={onToggle}>
        <h3 className="card-id">{card.id}</h3>
        <div className="dropdown-toggle">
          <span>View URL</span>
          <ChevronDown size={16} className={`dropdown-icon ${isExpanded ? "expanded" : ""}`} />
        </div>
      </div>

      <div className={`card-content ${isExpanded ? "expanded" : ""}`}>
        <div className="card-content-inner">
          <div className="url-label">URL</div>
          <div className="url-value">
            {isValidUrl(card.url) ? (
              <a href={card.url} target="_blank" rel="noopener noreferrer" className="url-link">
                {card.url} <ExternalLink size={14} style={{ display: "inline", marginLeft: "4px" }} />
              </a>
            ) : (
              card.url
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage({ cardData }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCards, setExpandedCards] = useState(new Set())

  // Filter cards based on search term
  const filteredCards = useMemo(() => {
    if (!searchTerm.trim()) {
      return cardData
    }

    return cardData.filter((card) => card.id === Number(searchTerm))
  }, [cardData, searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // Clear expanded cards when searching
    setExpandedCards(new Set())
  }

  const toggleCard = (cardId) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        {/* Search Header */}
        <div className="search-header">
          <h1 className="search-title">Saved Card Search</h1>
          <p className="search-subtitle">Search through your card collection by ID</p>

          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search by ID..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="search-icon" size={20} />
          </div>

          <div className="search-results-count">
            {searchTerm
              ? `${filteredCards.length} result${filteredCards.length !== 1 ? "s" : ""} found`
              : `${cardData.length} total cards`}
          </div>
        </div>

        {/* Cards Container */}
        <div className="cards-container">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <SearchCard
                key={card.id}
                card={card}
                isExpanded={expandedCards.has(card.id)}
                onToggle={() => toggleCard(card.id)}
              />
            ))
          ) : (
            <div className="no-results">
              <h3 className="no-results-title">No Results Found</h3>
              <p className="no-results-text">
                {searchTerm
                  ? `No cards found matching "${searchTerm}". Try a different search term.`
                  : "No cards available to display."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
